import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LunaControl } from '../luna-control';

@Component({
    selector: 'luna-textarea',
    standalone: true,
    templateUrl: './textarea.component.html',
    styleUrls: [ './textarea.component.scss' ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextareaComponent),
        multi: true
    }]
})
export class TextareaComponent extends LunaControl implements ControlValueAccessor
{
    @Input()
    public cols?: number;

    @Input()
    public placeholder?: string;

    @Input()
    public readonly = false;

    @Input()
    public rows?: number;

    @Output()
    public change = new EventEmitter<string>();

    @Output()
    public blur = new EventEmitter<FocusEvent>();

    public value = '';

    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    public onTextareaChange(event: Event): void
    {
        const target = event.target as HTMLTextAreaElement;
        this.value = target.value;
        this.onChange(this.value);
        this.change.emit(this.value);
    }

    public onTextareaBlur(event: FocusEvent): void
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
