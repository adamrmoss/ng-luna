import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit, ViewChild, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Platform } from '@angular/cdk/platform';
import { BidiModule, Dir } from '@angular/cdk/bidi';

import { LunaControl } from '../luna-control';

/**
 * Allowed values for the host input `type` attribute.
 */
export type InputType = 'text' | 'password' | 'email';

/**
 * Single-line text input with `ControlValueAccessor`, focus monitoring, and optional a11y blur announcements.
 */
@Component({
    selector: 'luna-input',
    standalone: true,
    imports: [ TextFieldModule, BidiModule ],
    templateUrl: './input.component.html',
    styleUrls: [ './input.component.scss' ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }]
})
export class InputComponent
    extends LunaControl implements ControlValueAccessor, AfterViewInit, OnDestroy
{
    /** Sets the host `placeholder` attribute when bound. */
    @Input()
    public placeholder?: string;

    /** Sets the host `readonly` property when true. */
    @Input()
    public readonly = false;

    /** Sets the host `type` attribute. */
    @Input()
    public type: InputType = 'text';

    /** Emits when the field loses focus. */
    @Output()
    public blur = new EventEmitter<FocusEvent>();

    /** Emits on each `input` event with the current string value. */
    @Output()
    public change = new EventEmitter<string>();

    /** Template reference to the native input for callers that need direct access. */
    @ViewChild('inputElement', { static: false })
    public inputElement?: ElementRef<HTMLInputElement>;

    /** Current value mirrored from the native input and the form model. */
    public value = '';

    private onChange: (value: string) => void = () => {};

    private onTouched: () => void = () => {};

    /**
     * @param elementRef - Host wrapper used for focus monitoring.
     * @param focusMonitor - CDK focus monitor for keyboard focus visuals.
     * @param liveAnnouncer - Announces the current value on blur when `id` is set.
     * @param platform - CDK platform detection for optional behavior.
     * @param dir - Optional text direction when `Dir` is provided by ancestors.
     */
    public constructor(
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor,
        private liveAnnouncer: LiveAnnouncer,
        public platform: Platform,
        @Optional() public dir: Dir
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
     * Pushes the native value into the form API and the `change` output.
     *
     * @param event - Native `input` event from the host.
     */
    public onInputChange(event: Event): void
    {
        // Treat the event target as the source of truth for the string model.
        const target = event.target as HTMLInputElement;
        this.value = target.value;

        // Keep Angular forms and template subscribers aligned with keystrokes.
        this.onChange(this.value);
        this.change.emit(this.value);
    }

    /**
     * Marks the control touched, optionally announces the value, and emits `blur`.
     *
     * @param event - Native `blur` event from the host.
     */
    public onInputBlur(event: FocusEvent): void
    {
        // Satisfy the CVA touch contract for touched/dirty state.
        this.onTouched();

        // Offer a polite summary when both an id and a non-empty value exist.
        if (this.value && this.id)
        {
            this.liveAnnouncer.announce(`${this.id} value is ${this.value}`, 'polite');
        }

        // Allow parents to run validation or save-on-blur flows.
        this.blur.emit(event);
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
