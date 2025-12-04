import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDrag } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';

@Component({
    selector: 'luna-window',
    standalone: true,
    imports: [ CommonModule, DragDropModule, ScrollingModule ],
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

    @Input()
    public boundaryElement?: string;

    @Input()
    public scrollable = false;

    public dragDisabled = false;

    @ViewChild(CdkDrag, { static: false })
    private dragInstance?: CdkDrag;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        public platform: Platform
    )
    {
        super();
    }

    public ngAfterViewInit(): void
    {
        this.updateDragState();
        this.updateDragBoundary();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['isMaximized'])
        {
            this.updateDragState();
        }
        if (changes['boundaryElement'])
        {
            this.updateDragBoundary();
        }
    }

    private updateDragState(): void
    {
        this.dragDisabled = this.isMaximized;
    }

    private updateDragBoundary(): void
    {
        if (this.dragInstance && this.boundaryElement)
        {
            const boundary = document.querySelector(this.boundaryElement);
            if (boundary)
            {
                this.dragInstance.boundaryElement = boundary as HTMLElement;
            }
        }
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
