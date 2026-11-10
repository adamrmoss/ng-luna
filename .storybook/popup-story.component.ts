import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../src/controls/button/button.component';
import { LunaPopupService } from '../src/controls/popup';
import { PopupBodyComponent } from './popup-body.component';

/**
 * Opens a caller-owned window through LunaPopupService.
 */
@Component({
    selector: 'app-popup-story',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './popup-story.component.html',
})
export class PopupStoryComponent
{
    /** Last popup result. */
    public result: string = '';

    private readonly popups = inject(LunaPopupService);

    /**
     * Opens the publication popup.
     */
    public onOpen(): void
    {
        // The caller component owns the window. The service only veils and centers it.
        this.popups.open<string>(PopupBodyComponent, { data: 'A note from the shelf.' }).subscribe((value) =>
        {
            this.result = value ?? 'Dismissed.';
        });
    }
}
