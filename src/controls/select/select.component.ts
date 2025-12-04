import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';

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
export class SelectComponent
    extends LunaControl implements ControlValueAccessor, AfterViewInit, OnDestroy
{

    @Output()
    public change = new EventEmitter<string>();

    public value = '';

    private onChange: (value: string) => void = () => {};
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

    public onSelectChange(event: Event): void
    {
        const target = event.target as HTMLSelectElement;
        this.value = target.value;
        const selectedOption = target.options[target.selectedIndex];
        const optionText = selectedOption?.textContent || this.value;
        this.liveAnnouncer.announce(`Selected ${optionText}`, 'polite');
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
