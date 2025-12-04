import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
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
export class SliderComponent
    extends LunaControl implements ControlValueAccessor, AfterViewInit, OnDestroy
{
    @Input()
    public boxIndicator = false;

    @Input()
    public set max(value: NumberInput)
    {
        this._max = coerceNumberProperty(value, 100);
    }

    public get max(): number
    {
        return this._max;
    }

    @Input()
    public set min(value: NumberInput)
    {
        this._min = coerceNumberProperty(value, 0);
    }

    public get min(): number
    {
        return this._min;
    }

    @Input()
    public set step(value: NumberInput)
    {
        this._step = coerceNumberProperty(value, 1);
    }

    public get step(): number
    {
        return this._step;
    }

    @Input()
    public vertical = false;

    @Output()
    public change = new EventEmitter<number>();

    public value = 0;

    private _max = 100;
    private _min = 0;
    private _step = 1;

    private onChange: (value: number) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor,
        private liveAnnouncer: LiveAnnouncer,
        public platform: Platform
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

    public onSliderChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;
        this.value = Number(target.value);
        this.onChange(this.value);
        this.change.emit(this.value);
        this.liveAnnouncer.announce(`Value changed to ${this.value}`, 'polite');
    }

    public onSliderBlur(): void
    {
        this.onTouched();
    }

    public writeValue(value: number): void
    {
        this.value = coerceNumberProperty(value, 0);
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
