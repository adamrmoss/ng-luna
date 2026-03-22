import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';

/**
 * Radio option participating in a group via `ControlValueAccessor` string values.
 */
@Component({
    selector: 'luna-radio',
    standalone: true,
    templateUrl: './radio.component.html',
    styleUrls: [ './radio.component.scss' ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true
    }]
})
export class RadioComponent
    extends LunaControl implements ControlValueAccessor, AfterViewInit, OnDestroy
{
    /** Visible text associated with the option for a11y announcements. */
    @Input()
    public label?: string;

    /** Value this option contributes when selected. */
    @Input()
    public value?: string;

    /** Emits this option's value when it becomes selected. */
    @Output()
    public change = new EventEmitter<string>();

    /** True when this option matches the active form value. */
    public checked = false;

    private onChange: (value: string | null) => void = () => {};

    private onTouched: () => void = () => {};

    /**
     * @param elementRef - Host wrapper used for focus monitoring.
     * @param focusMonitor - CDK focus monitor for keyboard focus visuals.
     * @param liveAnnouncer - Announces selection changes to assistive tech.
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
     * Updates selection state from the native change event and notifies forms and listeners.
     *
     * @param event - Native change event from the inner input.
     */
    public onRadioChange(event: Event): void
    {
        // Read whether this radio is the active target of the change event.
        const target = event.target as HTMLInputElement;
        this.checked = target.checked;

        // Announce only when this instance becomes selected to avoid noisy updates.
        if (this.checked)
        {
            const label = this.label || this.value || 'radio option';
            this.liveAnnouncer.announce(`${label} selected`, 'polite');
        }

        // Emit null when unchecked so the group model can clear non-exclusive edge cases.
        this.onChange(this.checked ? this.value ?? null : null);
        this.onTouched();

        // Surface the value to template subscribers when this option owns a defined value.
        if (this.value)
        {
            this.change.emit(this.value);
        }
    }

    /**
     * Writes the group's current value and toggles `checked` when it matches `value`.
     *
     * @param value - Active value for the radio group, or null when cleared.
     */
    public writeValue(value: string | null): void
    {
        // Drive checked state strictly by equality against this option's `value`.
        this.checked = value === this.value;
    }

    /**
     * Registers the callback Angular forms invoke when the model changes.
     *
     * @param fn - Handler supplied by the forms API.
     */
    public registerOnChange(fn: (value: string | null) => void): void
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
