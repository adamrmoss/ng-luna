import { Overlay, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    inject,
    Input,
    OnDestroy,
    Output,
    EventEmitter,
    AfterContentInit,
    Injector,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { LunaMenuCoordinatorService } from './menu-coordinator.service';
import { LUNA_MENU_DATA, LunaMenuEntry, LunaMenuItem, LunaMenuPanelData } from './menu-data';
import { MenuPanelComponent } from './menu-panel.component';
import { LunaMenuTriggerDirective } from './menu-trigger.directive';

/**
 * Panel paint. Menubar is the bar dropdown. Context is the disk menu.
 */
export type LunaMenuVariant = 'menubar' | 'context';

/**
 * Hosts a trigger and opens a CDK overlay menu panel backed by `items`.
 */
@Component({
    selector: 'luna-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrls: [ './menu.component.scss' ],
})
export class LunaMenuComponent implements AfterContentInit, OnDestroy
{
    /** Menu rows shown in the overlay panel. */
    @Input()
    public items: LunaMenuEntry[] = [];

    /** Panel paint passed through to the overlay. */
    @Input()
    @HostBinding('attr.variant')
    public variant: LunaMenuVariant = 'menubar';

    /** Emits when the panel closes with a chosen item or null on dismiss. */
    @Output()
    public itemSelect = new EventEmitter<LunaMenuItem | null>();

    @ContentChild(LunaMenuTriggerDirective)
    private trigger: LunaMenuTriggerDirective | undefined;

    private readonly coordinator = inject(LunaMenuCoordinatorService);

    private readonly injector = inject(Injector);

    private readonly overlay = inject(Overlay);

    private outsideClickSubscription: Subscription | null = null;

    private overlayRef: ReturnType<Overlay['create']> | null = null;

    /**
     * Wires the content-projected trigger back to this menu instance.
     */
    public ngAfterContentInit(): void
    {
        // Let the trigger directive call `open` / `dismiss` on this host.
        if (this.trigger != null)
        {
            this.trigger.menu = this;
        }
    }

    /**
     * Tears down the overlay, notifies the coordinator, and clears the trigger link.
     */
    public ngOnDestroy(): void
    {
        // Ensure no stale overlay or document listeners survive the host.
        this.destroyOverlay();
        this.coordinator.notifyClosed(this);
        this.trigger?.setMenuOpenHighlight(false);

        if (this.trigger != null)
        {
            this.trigger.menu = null;
        }
    }

    /**
     * Closes the menu without a selection (same as outside dismiss).
     */
    public dismiss(): void
    {
        this.close(null);
    }

    /**
     * @returns True when an overlay is currently attached.
     */
    public isOpen(): boolean
    {
        return this.overlayRef !== null;
    }

    /**
     * Opens the menu anchored to `origin`, replacing any prior overlay for this instance.
     *
     * @param origin - Element used as the flexible connected position origin.
     */
    public open(origin: ElementRef<HTMLElement>): void
    {
        // Avoid opening an empty panel.
        if (this.items.length === 0)
        {
            return;
        }

        // Prefer dropping below the trigger, with fallbacks above and horizontally flipped.
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions([
                { overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom' },
                { overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top' },
                { overlayX: 'end', overlayY: 'top', originX: 'end', originY: 'bottom' },
                { overlayX: 'end', overlayY: 'bottom', originX: 'end', originY: 'top' },
            ])
            .withDefaultOffsetY(2)
            .withPush(false);

        // Offer left/right menubar navigation only when the trigger sits under a menubar landmark.
        const menubarNav = origin.nativeElement.closest('nav[role="menubar"]');

        this.present(
            positionStrategy,
            menubarNav != null
                ? (direction: -1 | 1) => this.navigateAdjacentInMenubar(origin, direction)
                : undefined,
        );

        // Keep the menubar trigger styled like hover while this dropdown is open.
        this.trigger?.setMenuOpenHighlight(true);
    }

    /**
     * Opens the menu at viewport coordinates with no trigger child.
     *
     * @param x - Viewport x coordinate for the panel's top-left corner.
     * @param y - Viewport y coordinate for the panel's top-left corner.
     */
    public openAt(x: number, y: number): void
    {
        // Avoid opening an empty panel.
        if (this.items.length === 0)
        {
            return;
        }

        // Pin the top-left to the point, then flip toward the opposite edges when space runs out.
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo({ x, y })
            .withPositions([
                { overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'top' },
                { overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top' },
                { overlayX: 'end', overlayY: 'top', originX: 'end', originY: 'top' },
                { overlayX: 'end', overlayY: 'bottom', originX: 'end', originY: 'top' },
            ])
            .withPush(false);

        this.present(positionStrategy);

        // A point open has no trigger, so drop any highlight left by a previous `open`.
        this.trigger?.setMenuOpenHighlight(false);
    }

    /**
     * Opens the overlay with `positionStrategy`, replacing any panel already open for this menu.
     *
     * @param positionStrategy - CDK strategy that places the panel.
     * @param navigateMenubarAdjacent - When set, Left/Right move to the neighboring menubar menu.
     */
    private present(
        positionStrategy: PositionStrategy,
        navigateMenubarAdjacent?: (direction: -1 | 1) => void,
    ): void
    {
        // Close any other menu first, then discard our own previous overlay if present.
        this.coordinator.notifyOpening(this);
        this.destroyOverlay();

        this.overlayRef = this.overlay.create({
            hasBackdrop: false,
            panelClass: [ 'luna-menu-overlay-panel' ],
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close(),
        });

        // Close when the user clicks elsewhere (except inside the panel or on any menu trigger).
        this.attachOutsideClickListener();

        const panelData: LunaMenuPanelData = {
            close: (selectedItem: LunaMenuItem | null) => this.close(selectedItem),
            items: this.items,
            variant: this.variant,
        };

        if (navigateMenubarAdjacent != null)
        {
            panelData.navigateMenubarAdjacent = navigateMenubarAdjacent;
        }

        // Provide panel data and a close callback bound to this host.
        const childInjector = Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: LUNA_MENU_DATA,
                    useValue: panelData,
                },
            ],
        });

        const portal = new ComponentPortal(MenuPanelComponent, null, childInjector);
        this.overlayRef.attach(portal);
        this.coordinator.notifyOpened(this);
    }

    /**
     * Subscribes to capturing document clicks to dismiss when the target is outside the panel.
     */
    private attachOutsideClickListener(): void
    {
        const ref = this.overlayRef;

        if (ref === null)
        {
            return;
        }

        this.outsideClickSubscription = fromEvent<MouseEvent>(document, 'click', { capture: true }).subscribe(
            (event: MouseEvent) =>
            {
                const target = event.target;

                if (target === null || !(target instanceof Node))
                {
                    return;
                }

                // Clicks inside the overlay should select rows, not dismiss.
                if (ref.overlayElement.contains(target))
                {
                    return;
                }

                const element = target instanceof Element ? target : target.parentElement;

                // Let another menu trigger handle the click so it can open its own panel.
                if (element?.closest('[lunaMenuTrigger]') != null)
                {
                    return;
                }

                this.close(null);
            }
        );
    }

    /**
     * Closes this menu and opens the previous or next `luna-menu` in the same menubar (wraps).
     *
     * @param origin - Trigger element ref passed to `open`.
     * @param direction - `-1` for left / previous, `1` for right / next.
     */
    private navigateAdjacentInMenubar(origin: ElementRef<HTMLElement>, direction: -1 | 1): void
    {
        const triggerEl = origin.nativeElement;

        // Resolve the menubar landmark and the host custom element for this dropdown.
        const menubar = triggerEl.closest('nav[role="menubar"]');
        const menuHost = triggerEl.closest('luna-menu');

        if (menubar == null || menuHost == null)
        {
            return;
        }

        // Order matches visual layout for direct children; `querySelectorAll` keeps document order.
        const menus = Array.from(menubar.querySelectorAll('luna-menu'));
        const index = menus.indexOf(menuHost as HTMLElement);

        if (index < 0)
        {
            return;
        }

        // Single-menu bars have nowhere to go; skip to avoid close/reopen flicker.
        const nextIndex = (index + direction + menus.length) % menus.length;

        if (nextIndex === index)
        {
            return;
        }

        const nextMenu = menus[nextIndex];
        const nextTrigger = nextMenu.querySelector<HTMLElement>('[lunaMenuTrigger]');

        if (nextTrigger == null)
        {
            return;
        }

        // Close without a selection, then open the sibling the same way a user click would.
        this.close(null);
        nextTrigger.click();
    }

    /**
     * Destroys the overlay, updates coordinator state, and emits the selection outcome.
     *
     * @param selectedItem - Chosen row, or null when dismissed without a choice.
     */
    private close(selectedItem: LunaMenuItem | null): void
    {
        this.destroyOverlay();
        this.trigger?.setMenuOpenHighlight(false);
        this.coordinator.notifyClosed(this);
        this.itemSelect.emit(selectedItem);
    }

    /**
     * Disposes the overlay ref and clears the outside-click subscription.
     */
    private destroyOverlay(): void
    {
        this.outsideClickSubscription?.unsubscribe();
        this.outsideClickSubscription = null;

        if (this.overlayRef === null)
        {
            return;
        }

        this.overlayRef.detach();
        this.overlayRef.dispose();
        this.overlayRef = null;
    }
}
