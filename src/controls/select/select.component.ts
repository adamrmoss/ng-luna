import { Component, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';

/**
 * Native `<select>` wrapper with `ControlValueAccessor` and selection announcements.
 */
@Component({
    selector: 'luna-select',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './select.component.html',
    styleUrls: [ './select.component.scss' ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true
    }]
})
export class SelectComponent
    extends LunaControl implements ControlValueAccessor, AfterViewInit, OnDestroy
{
    /** Emits when the selected option value changes. */
    @Output()
    public change = new EventEmitter<string>();

    /** Current option value mirrored from the native select and the form model. */
    public value = '';

    private onChange: (value: string) => void = () => {};

    private onTouched: () => void = () => {};

    /**
     * @param elementRef - Host wrapper used for focus monitoring.
     * @param focusMonitor - CDK focus monitor for keyboard focus visuals.
     * @param liveAnnouncer - Announces the visible label of the selected option.
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
     * Syncs the model from the native change event, announces the option, and notifies forms.
     *
     * @param event - Native `change` event from the host select.
     */
    public onSelectChange(event: Event): void
    {
        // Read the new value and the human-readable label from the DOM.
        const target = event.target as HTMLSelectElement;
        this.value = target.value;
        const selectedOption = target.options[target.selectedIndex];
        const optionText = selectedOption?.textContent || this.value;

        // Give assistive tech a concise description of the new selection.
        this.liveAnnouncer.announce(`Selected ${optionText}`, 'polite');

        // Propagate to Angular forms, mark touched, and surface to template subscribers.
        this.onChange(this.value);
        this.onTouched();
        this.change.emit(this.value);
    }

    /**
     * Writes the bound form value into the view model.
     *
     * @param value - Incoming string from the form control.
     */
    public writeValue(value: string): void
    {
        // Normalize nullish writes so the template always sees a string.
        this.value = value ?? '';
    }

    /**
     * Registers the callback Angular forms invoke when the model changes.
     *
     * @param fn - Handler supplied by the forms API.
     */
    public registerOnChange(fn: (value: string) => void): void
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
