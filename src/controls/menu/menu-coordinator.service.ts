import { Injectable } from '@angular/core';
import type { LunaMenuComponent } from './menu.component';

/**
 * Ensures at most one `LunaMenuComponent` overlay stays open at a time.
 */
@Injectable({
    providedIn: 'root'
})
export class LunaMenuCoordinatorService
{
    private currentMenu: LunaMenuComponent | null = null;

    /**
     * Clears the tracked menu when that instance reports it closed.
     *
     * @param menu - Menu instance that finished closing.
     */
    public notifyClosed(menu: LunaMenuComponent): void
    {
        // Drop the reference only when the closed menu is still the active one.
        if (this.currentMenu === menu)
        {
            this.currentMenu = null;
        }
    }

    /**
     * Records which menu is currently open for exclusive dismissal logic.
     *
     * @param menu - Menu instance that finished opening.
     */
    public notifyOpened(menu: LunaMenuComponent): void
    {
        this.currentMenu = menu;
    }

    /**
     * Dismisses any other open menu before the next menu opens.
     *
     * @param menu - Menu instance that is about to open.
     */
    public notifyOpening(menu: LunaMenuComponent): void
    {
        // Close the previous overlay when a different trigger requests focus.
        if (this.currentMenu !== null && this.currentMenu !== menu)
        {
            this.currentMenu.dismiss();
        }
    }
}
