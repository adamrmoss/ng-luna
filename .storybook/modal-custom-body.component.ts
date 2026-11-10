import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../src/controls/button/button.component';
import { MODAL_DATA } from '../src/controls/modal/modal-data';
import { LunaModalRef } from '../src/controls/modal/modal-ref';
import { WindowComponent } from '../src/controls/window/window.component';

/**
 * Caller-owned modal window. Backdrop click leaves it open.
 */
@Component({
    selector: 'app-modal-custom-body',
    standalone: true,
    imports: [ButtonComponent, WindowComponent],
    templateUrl: './modal-custom-body.component.html',
    host: {
        class: 'demo-surface',
    },
})
export class ModalCustomBodyComponent
{
    /** Note passed through MODAL_DATA. */
    public readonly note = inject(MODAL_DATA) as string;

    private readonly modalRef = inject(LunaModalRef<string>);

    /**
     * Closes from the title bar or the button.
     */
    public onClose(): void
    {
        this.modalRef.close(this.note);
    }
}
