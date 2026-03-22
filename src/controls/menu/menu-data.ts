import { InjectionToken } from '@angular/core';

/**
 * Selectable menu row with optional checked and disabled state.
 */
export interface LunaMenuItem
{
    /** When true, the row shows a checked affordance. */
    checked?: boolean;

    /** When true, the row is non-interactive. */
    disabled?: boolean;

    /** Primary text shown for the row. */
    label: string;
}

/**
 * Visual divider entry in a menu item list.
 */
export interface LunaMenuSeparator
{
    /** Discriminant marking this entry as a separator. */
    separator: true;
}

/**
 * Union of actionable items and separators for menu panels.
 */
export type LunaMenuEntry = LunaMenuItem | LunaMenuSeparator;

/**
 * Narrows a menu entry to `LunaMenuItem` when it is not a separator.
 *
 * @param entry - Menu row or separator from panel data.
 * @returns True when `entry` is an item with a label.
 */
export function isLunaMenuItem(entry: LunaMenuEntry): entry is LunaMenuItem
{
    // Treat missing entries as non-items.
    // Exclude rows that explicitly declare `separator: true`.
    return entry != null && !('separator' in entry && entry.separator);
}

/**
 * Data passed into an overlay-hosted menu panel via `LUNA_MENU_DATA`.
 */
export interface LunaMenuPanelData
{
    /** Closes the panel, optionally reporting the chosen item. */
    close: (selectedItem: LunaMenuItem | null) => void;

    /** Rows rendered inside the panel. */
    items: LunaMenuEntry[];
}

/**
 * Injection token supplying panel callbacks and item list for `MenuPanelComponent`.
 */
export const LUNA_MENU_DATA = new InjectionToken<LunaMenuPanelData>('LUNA_MENU_DATA');
