import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LunaControl } from '../luna-control';

export type InputType = 'text' | 'password' | 'email';

@Component({
    selector: 'luna-input',
    standalone: true,
    templateUrl: './input.component.html',
    styleUrls: [ './input.component.scss' ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }]
})
export class InputComponent extends LunaControl implements ControlValueAccessor
{
    @Input()
    public placeholder?: string;

    @Input()
    public readonly = false;

    @Input()
    public type: InputType = 'text';

    @Output()
    public change = new EventEmitter<string>();

    @Output()
    public blur = new EventEmitter<FocusEvent>();

    public value = '';

    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    public onInputChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;
        this.value = target.value;
        this.onChange(this.value);
        this.change.emit(this.value);
    }

    public onInputBlur(event: FocusEvent): void
    {
        this.onTouched();
        this.blur.emit(event);
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
