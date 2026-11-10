import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../src/controls/button/button.component';
import { LunaModalService } from '../src/controls/modal/modal.service';
import { POPUP_DATA, LunaPopupRef } from '../src/controls/popup';
import { WindowComponent } from '../src/controls/window/window.component';
import { ShelfModalComponent } from './shelf-modal.component';

/**
 * Status callback the shelf story passes through POPUP_DATA.
 */
export interface ShelfPopupData
{
    /** Records the stack on the story status line. */
    onStatus: (line: string) => void;
}

/**
 * Popup window on the shelf. It can open a modal over itself.
 */
@Component({
    selector: 'app-shelf-popup',
    standalone: true,
    imports: [ButtonComponent, WindowComponent],
    templateUrl: './shelf-popup.component.html',
    host: {
        class: 'demo-surface',
    },
})
export class ShelfPopupComponent
{
    private readonly data = inject(POPUP_DATA) as ShelfPopupData;

    private readonly modals = inject(LunaModalService);

    private readonly popupRef = inject(LunaPopupRef<string>);

    /**
     * Closes this popup from the title bar.
     */
    public onClose(): void
    {
        this.popupRef.close('publication');
    }

    /**
     * Opens a modal above this popup. The modal veil does not close on click.
     */
    public onOpenModal(): void
    {
        // The popup stays up. Escape closes the modal first because it is the top surface.
        this.data.onStatus('Modal over popup.');
        this.modals.open<string>(ShelfModalComponent, { data: 'Stacked on the publication.' }).subscribe(() =>
        {
            this.data.onStatus('Modal closed. Popup still open.');
        });
    }
}
