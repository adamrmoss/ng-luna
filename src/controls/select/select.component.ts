import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LunaControl } from '../luna-control';

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
export class SelectComponent extends LunaControl implements ControlValueAccessor
{

    @Output()
    public change = new EventEmitter<string>();

    public value = '';

    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    public onSelectChange(event: Event): void
    {
        const target = event.target as HTMLSelectElement;
        this.value = target.value;
        this.onChange(this.value);
        this.onTouched();
        this.change.emit(this.value);
    }

    public writeValue(value: string): void
    {
        this.value = value ?? '';
    }

    public registerOnChange(fn: (value: string) => void): void
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
