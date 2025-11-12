import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
    selector: 'luna-button',
    standalone: true,
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ]
})
export class ButtonComponent {
    @Input()
    public type: ButtonType = 'button';

    @Input()
    public disabled = false;

    @Input()
    public name?: string;

    @Input()
    public value?: string;

    @Input()
    public autofocus = false;

    @Input()
    public tabindex?: number;

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
