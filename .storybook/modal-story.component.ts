import { Component } from '@angular/core';

import { ButtonComponent } from '../src/controls/button/button.component';
import { type MessageBoxReturnData } from '../src/controls/modal/message-box-data';
import { LunaModalService } from '../src/controls/modal/modal.service';

/**
 * Story harness that opens alert, confirm, and prompt dialogs.
 */
@Component({
    selector: 'app-modal-story',
    standalone: true,
    imports: [
        ButtonComponent,
    ],
    templateUrl: './modal-story.component.html',
})
export class ModalStoryComponent
{
    /** Text of the latest dialog result. */
    public result = '';

    /**
     * @param modal - Library modal service used to open message boxes.
     */
    public constructor(private readonly modal: LunaModalService)
    {
    }

    /**
     * Opens an alert and records when it closes.
     */
    public onAlert(): void
    {
        // One-button dialog; the stream completes when the user dismisses it.
        this.modal.alert('This is a Storybook alert.', 'Alert').subscribe(() =>
        {
            this.result = 'Alert closed.';
        });
    }

    /**
     * Opens a confirm dialog and records the boolean result.
     */
    public onConfirm(): void
    {
        // OK resolves true; Cancel resolves false.
        this.modal.confirm('Continue?', 'Confirm').subscribe((confirmed: boolean) =>
        {
            this.result = confirmed ? 'Confirmed.' : 'Cancelled.';
        });
    }

    /**
     * Opens a prompt and records the button plus the field text.
     */
    public onPrompt(): void
    {
        // Prompt returns which button closed the dialog and the field value.
        this.modal.prompt('File name', 'Save As').subscribe((promptResult: MessageBoxReturnData) =>
        {
            this.result = `${promptResult.button}: ${promptResult.promptValue ?? ''}`;
        });
    }
}
