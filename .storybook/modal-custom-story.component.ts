import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../src/controls/button/button.component';
import { LunaModalService } from '../src/controls/modal/modal.service';
import { ModalCustomBodyComponent } from './modal-custom-body.component';

/**
 * Opens a custom modal through LunaModalService.open.
 */
@Component({
    selector: 'app-modal-custom-story',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './modal-custom-story.component.html',
})
export class ModalCustomStoryComponent
{
    /** Last modal result. */
    public result: string = '';

    private readonly modals = inject(LunaModalService);

    /**
     * Opens the note dialog. A backdrop click leaves it open. Escape closes it.
     */
    public onOpen(): void
    {
        // The caller component owns the window. The veil is the modal backdrop.
        this.modals.open<string>(ModalCustomBodyComponent, { data: 'A note that stays until you dismiss it.' }).subscribe((value) =>
        {
            this.result = value ?? 'Dismissed.';
        });
    }
}
