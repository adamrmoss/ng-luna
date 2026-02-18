import { InjectionToken } from '@angular/core';

export interface LunaMenuItem
{
    checked?: boolean;
    disabled?: boolean;
    label: string;
}

export interface LunaMenuSeparator
{
    separator: true;
}

export type LunaMenuEntry = LunaMenuItem | LunaMenuSeparator;

export function isLunaMenuItem(entry: LunaMenuEntry): entry is LunaMenuItem
{
    return entry != null && !('separator' in entry && entry.separator);
}

export interface LunaMenuPanelData
{
    close: (selectedItem: LunaMenuItem | null) => void;
    items: LunaMenuEntry[];
}

export const LUNA_MENU_DATA = new InjectionToken<LunaMenuPanelData>('LUNA_MENU_DATA');
