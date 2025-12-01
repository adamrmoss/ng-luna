import { Component, Input, Output, EventEmitter } from '@angular/core';

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
{
    @Input()
    public autofocus = false;

    @Input()
    public command?: string;

    @Input()
    public commandfor?: string;

    @Input()
    public disabled = false;

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
    public name?: string;

    @Input()
    public popovertarget?: string;

    @Input()
    public popovertargetaction?: PopoverTargetAction;

    @Input()
    public tabindex?: number;

    @Input()
    public type: ButtonType = 'button';

    @Input()
    public value?: string;

    @Output()
    public click = new EventEmitter<MouseEvent>();

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
