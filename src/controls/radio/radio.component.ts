import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';

import { LunaControl } from '../luna-control';

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
    @Input()
    public label?: string;

    @Input()
    public value?: string;

    @Output()
    public change = new EventEmitter<string>();

    public checked = false;

    private onChange: (value: string | null) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor
    )
    {
        super();
    }

    public ngAfterViewInit(): void
    {
        this.focusMonitor.monitor(this.elementRef);
    }

    public ngOnDestroy(): void
    {
        this.focusMonitor.stopMonitoring(this.elementRef);
    }

    public onRadioChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;
        this.checked = target.checked;
        this.onChange(this.checked ? this.value ?? null : null);
        this.onTouched();
        if (this.value)
        {
            this.change.emit(this.value);
        }
    }

    public writeValue(value: string | null): void
    {
        this.checked = value === this.value;
    }

    public registerOnChange(fn: (value: string | null) => void): void
    {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void
    {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void
    {
        this.disabled = isDisabled;
    }
}
