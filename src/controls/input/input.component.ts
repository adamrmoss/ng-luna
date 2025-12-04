import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Platform } from '@angular/cdk/platform';
import { BidiModule, Dir } from '@angular/cdk/bidi';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';

import { LunaControl } from '../luna-control';

export type InputType = 'text' | 'password' | 'email';

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

    @ViewChild('inputElement', { static: false })
    public inputElement?: ElementRef<HTMLInputElement>;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor,
        private liveAnnouncer: LiveAnnouncer,
        public platform: Platform,
        public dir: Dir,
        private clipboard: Clipboard
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
        if (this.value && this.id)
        {
            this.liveAnnouncer.announce(`${this.id} value is ${this.value}`, 'polite');
        }
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
