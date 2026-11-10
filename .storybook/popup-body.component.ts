import { Component, inject } from '@angular/core';

import { LunaPopupRef, POPUP_DATA } from '../src/controls/popup';
import { WindowComponent } from '../src/controls/window/window.component';

/**
 * Caller-owned popup window. The service only portals this component.
 */
@Component({
    selector: 'app-popup-body',
    standalone: true,
    imports: [WindowComponent],
    templateUrl: './popup-body.component.html',
    host: {
        class: 'demo-surface',
    },
})
export class PopupBodyComponent
{
    /** Note passed through POPUP_DATA. */
    public readonly note = inject(POPUP_DATA) as string;

    private readonly popupRef = inject(LunaPopupRef);

    /**
     * Closes from the title bar.
     */
    public onClose(): void
    {
        this.popupRef.close(this.note);
    }
}
