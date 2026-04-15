import {
    Component,
    HostListener,
    inject,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { isLunaMenuItem, LUNA_MENU_DATA, LunaMenuEntry, LunaMenuItem } from './menu-data';

/**
 * Overlay panel body: renders `LUNA_MENU_DATA.items` with keyboard and mouse highlighting.
 */
@Component({
    selector: 'luna-menu-panel',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './menu-panel.component.html',
    styleUrls: [ './menu-panel.component.scss' ]
})
export class MenuPanelComponent implements OnInit
{
    @ViewChild('panel')
    private panelRef: ElementRef<HTMLElement> | null = null;

    /** Injected panel payload (items + close callback). */
    protected readonly data = inject(LUNA_MENU_DATA);

    /** Index of the row receiving keyboard focus styling. */
    protected highlightedIndex = 0;

    /** Rows from injected data for the template. */
    protected get entries(): LunaMenuEntry[]
    {
        return this.data.items;
    }

    /**
     * Handles arrow keys, Enter, and Escape for the open panel.
     *
     * @param event - Keydown bubbled from the document.
     */
    @HostListener('document:keydown', [ '$event' ])
    public onKeydown(event: KeyboardEvent): void
    {
        switch (event.key)
        {
            case 'ArrowDown':
                event.preventDefault();
                this.moveHighlight(1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.moveHighlight(-1);
                break;
            case 'ArrowLeft':
                // Delegate to menubar wiring when this panel is a top-level bar menu.
                if (this.data.navigateMenubarAdjacent != null)
                {
                    event.preventDefault();
                    this.data.navigateMenubarAdjacent(-1);
                }

                break;
            case 'ArrowRight':
                if (this.data.navigateMenubarAdjacent != null)
                {
                    event.preventDefault();
                    this.data.navigateMenubarAdjacent(1);
                }

                break;
            case 'Enter':
                event.preventDefault();
                this.activateHighlighted();
                break;
            case 'Escape':
                event.preventDefault();
                this.data.close(null);
                break;
        }
    }

    /**
     * Positions highlight on the first selectable row and focuses the panel root.
     */
    public ngOnInit(): void
    {
        // Start keyboard navigation on the first enabled item.
        this.highlightedIndex = this.findFirstSelectableIndex();

        // Defer focus until the view child exists in the DOM.
        setTimeout(() => this.focusPanel(), 0);
    }

    /**
     * Narrows a menu entry to `LunaMenuItem` for template bindings.
     *
     * @param entry - Row from `entries`.
     * @returns True when the entry is an item row (not a separator).
     */
    protected isItem(entry: LunaMenuEntry): entry is LunaMenuItem
    {
        return isLunaMenuItem(entry);
    }

    /**
     * Reports whether a template index is the highlighted row.
     *
     * @param index - Template row index.
     * @returns True when `index` matches `highlightedIndex`.
     */
    protected isHighlighted(index: number): boolean
    {
        return this.highlightedIndex === index;
    }

    /**
     * Closes with the clicked item when it is not disabled.
     *
     * @param entry - Item associated with the clicked row.
     * @param _event - Native click (unused).
     */
    protected onItemClick(entry: LunaMenuItem, _event: MouseEvent): void
    {
        // Ignore clicks on disabled rows so they never emit a selection.
        if (entry.disabled)
        {
            return;
        }

        this.data.close(entry);
    }

    /**
     * Moves highlight to a row under the pointer when that row is selectable.
     *
     * @param index - Row index from the template.
     */
    protected onItemMouseenter(index: number): void
    {
        this.setCursorToSelectableIndex(index);
    }

    /**
     * Syncs highlight with the row under the cursor during mouse moves.
     *
     * @param event - Mouse event from a row or descendant.
     */
    protected onItemMousemove(event: MouseEvent): void
    {
        const el = (event.target as HTMLElement).closest?.('[data-menu-index]');

        if (el != null)
        {
            const index = parseInt((el as HTMLElement).getAttribute('data-menu-index') ?? '', 10);

            if (!Number.isNaN(index))
            {
                this.setCursorToSelectableIndex(index);
            }
        }
    }

    /**
     * Activates the currently highlighted row when it is a selectable item.
     */
    private activateHighlighted(): void
    {
        const entry = this.data.items[this.highlightedIndex];

        if (entry != null && isLunaMenuItem(entry) && !entry.disabled)
        {
            this.data.close(entry);
        }
    }

    /**
     * Finds the first non-separator, enabled item index for initial focus.
     *
     * @returns First selectable index, or 0 when none match.
     */
    private findFirstSelectableIndex(): number
    {
        for (let i = 0; i < this.data.items.length; i++)
        {
            const entry = this.data.items[i];

            if (entry != null && isLunaMenuItem(entry) && !entry.disabled)
            {
                return i;
            }
        }

        return 0;
    }

    /**
     * Moves roving tabindex focus to the panel root for arrow-key handling.
     */
    private focusPanel(): void
    {
        this.panelRef?.nativeElement?.focus();
    }

    /**
     * Walks items in `delta` direction until a selectable row is found.
     *
     * @param delta - +1 for down, -1 for up (wraps).
     */
    private moveHighlight(delta: number): void
    {
        const items = this.data.items;
        let next = this.highlightedIndex;

        do
        {
            next = (next + delta + items.length) % items.length;
            const entry = items[next];

            if (entry != null && isLunaMenuItem(entry) && !entry.disabled)
            {
                this.highlightedIndex = next;

                return;
            }
        }
        while (next !== this.highlightedIndex);
    }

    /**
     * Updates `highlightedIndex` when `index` points at a selectable item.
     *
     * @param index - Candidate row index.
     */
    private setCursorToSelectableIndex(index: number): void
    {
        const entry = this.data.items[index];

        if (entry != null && isLunaMenuItem(entry) && !entry.disabled)
        {
            this.highlightedIndex = index;
        }
    }
}
