import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';

/**
 * Range input with `ControlValueAccessor`, optional vertical layout, and value announcements.
 */
@Component({
    selector: 'luna-slider',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './slider.component.html',
    styleUrls: [ './slider.component.scss' ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SliderComponent),
        multi: true
    }]
})
export class SliderComponent
    extends LunaControl implements ControlValueAccessor, AfterViewInit, OnDestroy
{
    /** Renders a box-style thumb indicator when true. */
    @Input()
    public boxIndicator = false;

    /** Coerces and stores the slider maximum (default 100). */
    @Input()
    public set max(value: NumberInput)
    {
        // Normalize attribute/string inputs to a finite number for the native range.
        this._max = coerceNumberProperty(value, 100);
    }

    /** Returns the coerced maximum bound. */
    public get max(): number
    {
        return this._max;
    }

    /** Coerces and stores the slider minimum (default 0). */
    @Input()
    public set min(value: NumberInput)
    {
        this._min = coerceNumberProperty(value, 0);
    }

    /** Returns the coerced minimum bound. */
    public get min(): number
    {
        return this._min;
    }

    /** Coerces and stores the step increment (default 1). */
    @Input()
    public set step(value: NumberInput)
    {
        this._step = coerceNumberProperty(value, 1);
    }

    /** Returns the coerced step. */
    public get step(): number
    {
        return this._step;
    }

    /** Uses a vertical range presentation when true. */
    @Input()
    public vertical = false;

    /** Emits when the thumb value changes. */
    @Output()
    public change = new EventEmitter<number>();

    /** Current numeric value mirrored from the native range and the form model. */
    public value = 0;

    private _max = 100;

    private _min = 0;

    private _step = 1;

    private onChange: (value: number) => void = () => {};

    private onTouched: () => void = () => {};

    /**
     * @param elementRef - Host wrapper used for focus monitoring.
     * @param focusMonitor - CDK focus monitor for keyboard focus visuals.
     * @param liveAnnouncer - Announces value changes to assistive tech.
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
     * Syncs the numeric value from the native input and notifies forms, outputs, and the announcer.
     *
     * @param event - Native `input` or `change` event from the range control.
     */
    public onSliderChange(event: Event): void
    {
        // Parse the string value from the range input into a number model.
        const target = event.target as HTMLInputElement;
        this.value = Number(target.value);

        // Update Angular forms and template subscribers before the announcement.
        this.onChange(this.value);
        this.change.emit(this.value);

        // Give a concise polite update after programmatic and user-driven moves.
        this.liveAnnouncer.announce(`Value changed to ${this.value}`, 'polite');
    }

    /**
     * Marks the control touched for the CVA contract on blur.
     */
    public onSliderBlur(): void
    {
        this.onTouched();
    }

    /**
     * Writes the bound form value into the view model.
     *
     * @param value - Incoming number from the form control.
     */
    public writeValue(value: number): void
    {
        // Coerce loosely typed writes so the range always receives a finite number.
        this.value = coerceNumberProperty(value, 0);
    }

    /**
     * Registers the callback Angular forms invoke when the model changes.
     *
     * @param fn - Handler supplied by the forms API.
     */
    public registerOnChange(fn: (value: number) => void): void
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
