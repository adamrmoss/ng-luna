import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';

/**
 * Accessible checkbox bound to reactive forms via `ControlValueAccessor`.
 */
@Component({
    selector: 'luna-checkbox',
    standalone: true,
    templateUrl: './checkbox.component.html',
    styleUrls: [ './checkbox.component.scss' ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }]
})
export class CheckboxComponent
    extends LunaControl implements ControlValueAccessor, AfterViewInit, OnDestroy
{
    /** Visible text associated with the control for a11y announcements. */
    @Input()
    public label?: string;

    /** Optional value submitted with the native input when used in a form. */
    @Input()
    public value?: string;

    /** Emits when the checked state changes from user interaction. */
    @Output()
    public change = new EventEmitter<boolean>();

    /** Mirrors the native input checked state for the template. */
    public checked = false;

    private onChange: (value: boolean) => void = () => {};

    private onTouched: () => void = () => {};

    /**
     * @param elementRef - Host wrapper used for focus monitoring.
     * @param focusMonitor - CDK focus monitor for keyboard focus visuals.
     * @param liveAnnouncer - Announces state changes to assistive tech.
     * @param platform - CDK platform detection for optional behavior.
     */
    public constructor(
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor,
        private liveAnnouncer: LiveAnnouncer,
        public platform: Platform
    )
    {
        super();
    }

    /**
     * Starts monitoring the host for focus state.
     */
    public ngAfterViewInit(): void
    {
        // Register the host so a11y focus classes stay in sync with keyboard use.
        this.focusMonitor.monitor(this.elementRef);
    }

    /**
     * Stops focus monitoring when the view is destroyed.
     */
    public ngOnDestroy(): void
    {
        // Tear down CDK monitoring tied to this host element.
        this.focusMonitor.stopMonitoring(this.elementRef);
    }

    /**
     * Syncs model state from the native change event and announces the new state.
     *
     * @param event - Native change event from the inner input.
     */
    public onCheckboxChange(event: Event): void
    {
        // Pull the authoritative checked flag from the event target.
        const target = event.target as HTMLInputElement;
        this.checked = target.checked;

        // Describe the control for polite live region updates.
        const label = this.label || 'checkbox';
        const state = this.checked ? 'checked' : 'unchecked';
        this.liveAnnouncer.announce(`${label} ${state}`, 'polite');

        // Notify Angular forms and external listeners in a single update turn.
        this.onChange(this.checked);
        this.onTouched();
        this.change.emit(this.checked);
    }

    /**
     * Writes the bound form value into the view model.
     *
     * @param value - Incoming value from the form control.
     */
    public writeValue(value: boolean): void
    {
        // Coerce loosely typed form values to a boolean the template can bind.
        this.checked = coerceBooleanProperty(value);
    }

    /**
     * Registers the callback Angular forms invoke when the model changes.
     *
     * @param fn - Handler supplied by the forms API.
     */
    public registerOnChange(fn: (value: boolean) => void): void
    {
        this.onChange = fn;
    }

    /**
     * Registers the callback Angular forms invoke on blur/touch.
     *
     * @param fn - Handler supplied by the forms API.
     */
    public registerOnTouched(fn: () => void): void
    {
        this.onTouched = fn;
    }

    /**
     * Applies disabled state from the form control to the component input.
     *
     * @param isDisabled - Whether the control should be disabled.
     */
    public setDisabledState(isDisabled: boolean): void
    {
        // Keep `LunaControl.disabled` in sync with the CVA contract.
        this.disabled = isDisabled;
    }
}
