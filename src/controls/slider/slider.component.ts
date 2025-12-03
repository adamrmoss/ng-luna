import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LunaControl } from '../luna-control';

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
export class SliderComponent extends LunaControl implements ControlValueAccessor
{
    @Input()
    public boxIndicator = false;

    @Input()
    public max = 100;

    @Input()
    public min = 0;

    @Input()
    public step = 1;

    @Input()
    public vertical = false;

    @Output()
    public change = new EventEmitter<number>();

    public value = 0;

    private onChange: (value: number) => void = () => {};
    private onTouched: () => void = () => {};

    public onSliderChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;
        this.value = Number(target.value);
        this.onChange(this.value);
        this.change.emit(this.value);
    }

    public onSliderBlur(): void
    {
        this.onTouched();
    }

    public writeValue(value: number): void
    {
        this.value = value ?? 0;
    }

    public registerOnChange(fn: (value: number) => void): void
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
