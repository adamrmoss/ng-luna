import { Component } from '@angular/core';
import { ButtonComponent } from '../src/controls/button/button.component';
import { WindowComponent } from '../src/controls/window/window.component';

/**
 * Inserts and removes a window so the opacity entrance plays again.
 */
@Component({
    selector: 'app-window-entrance',
    standalone: true,
    imports: [ButtonComponent, WindowComponent],
    templateUrl: './window-entrance.component.html',
})
export class WindowEntranceComponent
{
    /** Whether the window is in the canvas. */
    public isOpen: boolean = false;

    /**
     * Shows the window.
     */
    public onOpen(): void
    {
        this.isOpen = true;
    }

    /**
     * Removes the window so the next open replays the entrance.
     */
    public onClose(): void
    {
        this.isOpen = false;
    }
}
