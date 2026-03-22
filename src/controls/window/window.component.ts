import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDrag } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';

/**
 * Desktop-style window shell: CDK drag, optional boundary selector, title bar actions, scrollable body.
 */
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
    /** CSS selector for an element that constrains dragging (e.g. desktop bounds). */
    @Input()
    public boundaryElement?: string;

    /** Disables dragging independently of maximize state. */
    @Input()
    public dragDisabled = false;

    /** When true, the template shows a maximized layout and disables drag. */
    @Input()
    public isMaximized = false;

    /** Enables CDK scrolling on the window body region. */
    @Input()
    public scrollable = false;

    /** Shows the close control in the title bar. */
    @Input()
    public showClose = true;

    /** Shows the help control in the title bar. */
    @Input()
    public showHelp = false;

    /** Shows the maximize/restore control. */
    @Input()
    public showMaximize = true;

    /** Shows the minimize control. */
    @Input()
    public showMinimize = true;

    /** Title bar caption text. */
    @Input()
    public title?: string;

    /** Emits when the user requests closing the window. */
    @Output()
    public close = new EventEmitter<void>();

    /** Emits when the user invokes help from the title bar. */
    @Output()
    public help = new EventEmitter<void>();

    /** Emits when the user requests maximize. */
    @Output()
    public maximize = new EventEmitter<void>();

    /** Emits when the user requests minimize. */
    @Output()
    public minimize = new EventEmitter<void>();

    /** Emits when the user requests restore from maximized state. */
    @Output()
    public restore = new EventEmitter<void>();

    @ViewChild(CdkDrag, { static: false })
    private dragInstance?: CdkDrag;

    /**
     * @param elementRef - Host element reference (reserved for future layout hooks).
     * @param platform - CDK platform detection for optional behavior.
     */
    public constructor(
        private elementRef: ElementRef<HTMLElement>,
        public platform: Platform
    )
    {
        super();
    }

    /**
     * Applies the drag boundary once `CdkDrag` is available.
     */
    public ngAfterViewInit(): void
    {
        this.updateDragBoundary();
    }

    /**
     * Re-applies the drag boundary when the selector input changes.
     *
     * @param changes - Angular change record for bound inputs.
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        // Re-query the DOM when the boundary selector string updates.
        if (changes['boundaryElement'])
        {
            this.updateDragBoundary();
        }
    }

    /**
     * @returns True when drag should be inactive (explicit flag or maximized).
     */
    public get isDragDisabled(): boolean
    {
        return this.dragDisabled || this.isMaximized;
    }

    /**
     * Forwards minimize intent to the parent shell.
     */
    public onMinimize(): void
    {
        this.minimize.emit();
    }

    /**
     * Toggles between maximize and restore emissions based on `isMaximized`.
     */
    public onMaximize(): void
    {
        // Maximized windows use restore; otherwise request maximize from the shell.
        if (this.isMaximized)
        {
            this.restore.emit();
        }
        else
        {
            this.maximize.emit();
        }
    }

    /**
     * Forwards help intent to the parent shell.
     */
    public onHelp(): void
    {
        this.help.emit();
    }

    /**
     * Forwards close intent to the parent shell.
     */
    public onClose(): void
    {
        this.close.emit();
    }

    /**
     * Points CDK drag at the resolved boundary element when both exist.
     */
    private updateDragBoundary(): void
    {
        if (this.dragInstance && this.boundaryElement)
        {
            // Resolve the constraint element once per change or init.
            const boundary = document.querySelector(this.boundaryElement);

            if (boundary)
            {
                this.dragInstance.boundaryElement = boundary as HTMLElement;
            }
        }
    }
}
