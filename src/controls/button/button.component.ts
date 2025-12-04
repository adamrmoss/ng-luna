import { Component, Input, Output, EventEmitter, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

import { LunaControl } from '../luna-control';

export type ButtonType = 'button' | 'submit' | 'reset';

export type FormEnctype = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

export type FormMethod = 'get' | 'post';

export type FormTarget = '_self' | '_blank' | '_parent' | '_top';

export type PopoverTargetAction = 'show' | 'hide' | 'toggle';

@Component({
    selector: 'luna-button',
    standalone: true,
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ]
})
export class ButtonComponent
    extends LunaControl implements AfterViewInit, OnDestroy
{
    @Input()
    public command?: string;

    @Input()
    public commandfor?: string;

    @Input()
    public form?: string;

    @Input()
    public formaction?: string;

    @Input()
    public formenctype?: FormEnctype;

    @Input()
    public formmethod?: FormMethod;

    @Input()
    public formnovalidate = false;

    @Input()
    public formtarget?: FormTarget;

    @Input()
    public popovertarget?: string;

    @Input()
    public popovertargetaction?: PopoverTargetAction;

    @Input()
    public type: ButtonType = 'button';

    @Input()
    public value?: string;

    @Output()
    public click = new EventEmitter<MouseEvent>();

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

    public onClick(event: MouseEvent): void
    {
        if (this.disabled)
        {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        this.click.emit(event);
    }
}
