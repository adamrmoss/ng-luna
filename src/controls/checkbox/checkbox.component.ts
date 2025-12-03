import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class CheckboxComponent extends LunaControl implements ControlValueAccessor
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
        this.checked = value;
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
