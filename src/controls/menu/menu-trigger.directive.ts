import {
    Directive,
    ElementRef,
    HostListener,
    inject,
    Input
} from '@angular/core';

import { LunaMenuComponent } from './menu.component';

/**
 * Toggle trigger that opens or dismisses the parent `LunaMenuComponent` on click.
 */
@Directive({
    selector: '[lunaMenuTrigger]',
    standalone: true
})
export class LunaMenuTriggerDirective
{
    private readonly elementRef = inject(ElementRef<HTMLElement>);

    /**
     * Optional binding for symmetry with the attribute selector; value is unused.
     */
    @Input()
    public lunaMenuTrigger: unknown = '';

    /**
     * Set by `LunaMenuComponent` after content init; null when detached.
     */
    public menu: LunaMenuComponent | null = null;

    /**
     * Toggles the menu or dismisses it when already open.
     *
     * @param event - Native click on the host element.
     */
    @HostListener('click', [ '$event' ])
    public onClick(event: Event): void
    {
        // Prevent the document capture listener from treating this as an outside click.
        event.preventDefault();
        event.stopPropagation();

        // Close on second click on the same trigger; otherwise open anchored here.
        if (this.menu?.isOpen() === true)
        {
            this.menu.dismiss();

            return;
        }

        this.menu?.open(this.elementRef);
    }
}
