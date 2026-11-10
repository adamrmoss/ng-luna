import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../src/controls/button/button.component';
import { MenuBarComponent } from '../src/controls/menu-bar/menu-bar.component';
import { type LunaMenuEntry, type LunaMenuItem } from '../src/controls/menu/menu-data';
import { LunaMenuLinkDirective } from '../src/controls/menu/menu-link.directive';
import { LunaMenuTriggerDirective } from '../src/controls/menu/menu-trigger.directive';
import { LunaMenuComponent } from '../src/controls/menu/menu.component';
import { LunaPopupService } from '../src/controls/popup';
import { WindowComponent } from '../src/controls/window/window.component';
import { ShelfPopupComponent, type ShelfPopupData } from './shelf-popup.component';

/**
 * Maximized shell with a menu bar, a menu link, a popup, and a modal.
 */
@Component({
    selector: 'app-shelf-story',
    standalone: true,
    imports: [
        ButtonComponent,
        LunaMenuComponent,
        LunaMenuLinkDirective,
        LunaMenuTriggerDirective,
        MenuBarComponent,
        WindowComponent,
    ],
    templateUrl: './shelf-story.component.html',
})
export class ShelfStoryComponent
{
    /** File menu rows. */
    public readonly fileItems: LunaMenuEntry[] = [
        { label: 'New' },
        { label: 'Open...' },
        { label: 'Save' },
        { separator: true },
        { label: 'Exit' },
    ];

    /** Edit menu rows. */
    public readonly editItems: LunaMenuEntry[] = [
        { disabled: true, label: 'Undo' },
        { separator: true },
        { label: 'Paste' },
    ];

    /** Latest menu, popup, or modal result. */
    public status: string = 'Shelf ready.';

    private readonly popups = inject(LunaPopupService);

    /**
     * Records a menu choice. A null item is a dismiss.
     *
     * @param item - Chosen row, or null when the menu closes without a choice.
     */
    public onMenu(item: LunaMenuItem | null): void
    {
        this.status = item?.label == null ? 'Menu closed.' : `Menu: ${item.label}`;
    }

    /**
     * Keeps the guide link from navigating. It does not open a menu.
     *
     * @param event - Click on the menu-bar link.
     */
    public onGuide(event: Event): void
    {
        event.preventDefault();
        this.status = 'Guide link. It does not open a menu.';
    }

    /**
     * Opens the publication popup over the maximized window.
     */
    public onOpenPopup(): void
    {
        const data: ShelfPopupData = {
            onStatus: (line: string) =>
            {
                this.status = line;
            },
        };

        // The popup can open a modal. Escape closes the modal first, then this popup.
        this.status = 'Popup open.';
        this.popups.open<string>(ShelfPopupComponent, { data }).subscribe((value) =>
        {
            this.status = value == null ? 'Popup closed.' : `Popup closed: ${value}`;
        });
    }
}
