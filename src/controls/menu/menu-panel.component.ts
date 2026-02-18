import {
    Component,
    HostListener,
    inject,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LUNA_MENU_DATA } from './menu-data';
import { isLunaMenuItem, LunaMenuEntry, LunaMenuItem } from './menu-data';

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

    protected readonly data = inject(LUNA_MENU_DATA);
    protected highlightedIndex = 0;

    protected get entries(): LunaMenuEntry[]
    {
        return this.data.items;
    }

    protected isItem(entry: LunaMenuEntry): entry is LunaMenuItem
    {
        return isLunaMenuItem(entry);
    }

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

    public ngOnInit(): void
    {
        this.highlightedIndex = this.findFirstSelectableIndex();
        setTimeout(() => this.focusPanel(), 0);
    }

    protected onItemClick(entry: LunaMenuItem, _event: MouseEvent): void
    {
        if (entry.disabled)
        {
            return;
        }
        this.data.close(entry);
    }

    protected onItemMouseenter(index: number): void
    {
        this.setCursorToSelectableIndex(index);
    }

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

    protected isHighlighted(index: number): boolean
    {
        return this.highlightedIndex === index;
    }

    private activateHighlighted(): void
    {
        const entry = this.data.items[this.highlightedIndex];
        if (entry != null && isLunaMenuItem(entry) && !entry.disabled)
        {
            this.data.close(entry);
        }
    }

    private setCursorToSelectableIndex(index: number): void
    {
        const entry = this.data.items[index];
        if (entry != null && isLunaMenuItem(entry) && !entry.disabled)
        {
            this.highlightedIndex = index;
        }
    }

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

    private focusPanel(): void
    {
        this.panelRef?.nativeElement?.focus();
    }

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
}
