import { Injectable } from '@angular/core';
import type { LunaMenuComponent } from './menu.component';

@Injectable({
    providedIn: 'root'
})
export class LunaMenuCoordinatorService
{
    private currentMenu: LunaMenuComponent | null = null;

    public notifyClosed(menu: LunaMenuComponent): void
    {
        if (this.currentMenu === menu)
        {
            this.currentMenu = null;
        }
    }

    public notifyOpened(menu: LunaMenuComponent): void
    {
        this.currentMenu = menu;
    }

    public notifyOpening(menu: LunaMenuComponent): void
    {
        if (this.currentMenu !== null && this.currentMenu !== menu)
        {
            this.currentMenu.dismiss();
        }
    }
}
