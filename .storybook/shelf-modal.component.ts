import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../src/controls/button/button.component';
import { MODAL_DATA } from '../src/controls/modal/modal-data';
import { LunaModalRef } from '../src/controls/modal/modal-ref';
import { WindowComponent } from '../src/controls/window/window.component';

/**
 * Modal opened from the shelf popup. Backdrop click leaves it open.
 */
@Component({
    selector: 'app-shelf-modal',
    standalone: true,
    imports: [ButtonComponent, WindowComponent],
    templateUrl: './shelf-modal.component.html',
    host: {
        class: 'demo-surface',
    },
})
export class ShelfModalComponent
{
    /** Note passed through MODAL_DATA. */
    public readonly note = inject(MODAL_DATA) as string;

    private readonly modalRef = inject(LunaModalRef<string>);

    /**
     * Closes the modal and leaves the popup underneath.
     */
    public onClose(): void
    {
        this.modalRef.close(this.note);
    }
}
