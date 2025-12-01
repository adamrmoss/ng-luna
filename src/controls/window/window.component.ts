import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'luna-window',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './window.component.html',
    styleUrls: [ './window.component.scss' ]
})
export class WindowComponent
{
    @Input()
    public title?: string;

    @Input()
    public showMinimize = true;

    @Input()
    public showMaximize = true;

    @Input()
    public showHelp = false;

    @Input()
    public showClose = true;

    @Input()
    public isMaximized = false;

    @Output()
    public minimize = new EventEmitter<void>();

    @Output()
    public maximize = new EventEmitter<void>();

    @Output()
    public restore = new EventEmitter<void>();

    @Output()
    public help = new EventEmitter<void>();

    @Output()
    public close = new EventEmitter<void>();

    public onMinimize(): void
    {
        this.minimize.emit();
    }

    public onMaximize(): void
    {
        if (this.isMaximized)
        {
            this.restore.emit();
        }
        else
        {
            this.maximize.emit();
        }
    }

    public onHelp(): void
    {
        this.help.emit();
    }

    public onClose(): void
    {
        this.close.emit();
    }
}
