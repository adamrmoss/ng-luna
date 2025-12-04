import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import { LunaControl } from '../luna-control';

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
    @Input()
    public label?: string;

    @Input()
    public value?: string;

    @Output()
    public change = new EventEmitter<boolean>();

    public checked = false;

    private onChange: (value: boolean) => void = () => {};
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

    public onCheckboxChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;
        this.checked = target.checked;
        this.onChange(this.checked);
        this.onTouched();
        this.change.emit(this.checked);
    }

    public writeValue(value: boolean): void
    {
        this.checked = coerceBooleanProperty(value);
    }

    public registerOnChange(fn: (value: boolean) => void): void
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
