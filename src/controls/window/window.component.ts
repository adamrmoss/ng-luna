import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { LunaControl } from '../luna-control';

@Component({
    selector: 'luna-window',
    standalone: true,
    imports: [ CommonModule, DragDropModule ],
    templateUrl: './window.component.html',
    styleUrls: [ './window.component.scss' ]
})
export class WindowComponent
    extends LunaControl implements AfterViewInit, OnChanges
{
    @Input()
    public isMaximized = false;

    @Input()
    public showClose = true;

    @Input()
    public showHelp = false;

    @Input()
    public showMaximize = true;

    @Input()
    public showMinimize = true;

    @Input()
    public title?: string;

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

    public dragDisabled = false;

    constructor(
        private elementRef: ElementRef<HTMLElement>
    )
    {
        super();
    }

    public ngAfterViewInit(): void
    {
        this.updateDragState();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['isMaximized'])
        {
            this.updateDragState();
        }
    }

    private updateDragState(): void
    {
        this.dragDisabled = this.isMaximized;
    }

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
        this.updateDragState();
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
