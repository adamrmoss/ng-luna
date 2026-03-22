import {
    Directive,
    ElementRef,
    HostListener,
    inject,
    Injector,
    Input,
    OnDestroy
} from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from './tooltip.component';
import { LUNA_TOOLTIP_DATA } from './tooltip-data';

/**
 * CDK overlay tooltip directive, timers, and positioning helper for Luna tooltips.
 */

const FADE_OUT_MS = 120;
const HIDE_DELAY_MS = 250;
const SHOW_DELAY_MS = 60;

/**
 * Chooses an element ref for overlay positioning when the host has zero size.
 *
 * @param element - Host element that carries the directive.
 * @returns `ElementRef` for the host or its first child box.
 */
function getPositionOrigin(element: HTMLElement): ElementRef<HTMLElement>
{
    // Read layout so flexible positioning can anchor to a non-zero box.
    const rect = element.getBoundingClientRect();

    // Icons or inline hosts may report zero size; anchor to the first child box instead.
    if (rect.width === 0 && rect.height === 0 && element.firstElementChild instanceof HTMLElement)
    {
        return new ElementRef(element.firstElementChild);
    }

    return new ElementRef(element);
}

/**
 * Shows a delayed CDK overlay tooltip on hover/focus with a short fade-out on hide.
 */
@Directive({
    selector: '[lunaTooltip]',
    standalone: true
})
export class TooltipDirective implements OnDestroy
{
    /** Tooltip text; empty string suppresses the overlay. */
    @Input()
    public lunaTooltip: string = '';

    /** Milliseconds to wait before hiding after pointer/focus leaves. */
    @Input()
    public lunaTooltipHideDelay: number = HIDE_DELAY_MS;

    /** Milliseconds to wait before showing after pointer/focus enters. */
    @Input()
    public lunaTooltipShowDelay: number = SHOW_DELAY_MS;

    private readonly elementRef = inject(ElementRef<HTMLElement>);

    private readonly injector = inject(Injector);

    private readonly overlay = inject(Overlay);

    private hideTimeout: ReturnType<typeof setTimeout> | null = null;

    private overlayRef: ReturnType<Overlay['create']> | null = null;

    private showTimeout: ReturnType<typeof setTimeout> | null = null;

    /**
     * Schedules hide because focus left the host.
     */
    @HostListener('blur')
    public onBlur(): void
    {
        this.scheduleHide();
    }

    /**
     * Schedules show when the host receives focus.
     */
    @HostListener('focus')
    public onFocus(): void
    {
        this.scheduleShow();
    }

    /**
     * Schedules show when the pointer enters the host.
     */
    @HostListener('mouseenter')
    public onMouseEnter(): void
    {
        this.scheduleShow();
    }

    /**
     * Schedules hide when the pointer leaves the host.
     */
    @HostListener('mouseleave')
    public onMouseLeave(): void
    {
        this.scheduleHide();
    }

    /**
     * Clears timers and disposes any attached overlay.
     */
    public ngOnDestroy(): void
    {
        this.clearShowTimeout();
        this.clearHideTimeout();
        this.destroyOverlay();
    }

    /**
     * Drops a pending hide timer when present.
     */
    private clearHideTimeout(): void
    {
        if (this.hideTimeout !== null)
        {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    /**
     * Drops a pending show timer when present.
     */
    private clearShowTimeout(): void
    {
        if (this.showTimeout !== null)
        {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }

    /**
     * Detaches and disposes the overlay ref when one exists.
     */
    private destroyOverlay(): void
    {
        if (this.overlayRef === null)
        {
            return;
        }

        this.overlayRef.detach();
        this.overlayRef.dispose();
        this.overlayRef = null;
    }

    /**
     * Starts the hide delay after canceling any in-flight show.
     */
    private scheduleHide(): void
    {
        this.clearShowTimeout();

        if (this.overlayRef === null)
        {
            return;
        }

        this.clearHideTimeout();

        this.hideTimeout = setTimeout(() =>
        {
            this.hideTimeout = null;
            this.hideWithFade();
        }, this.lunaTooltipHideDelay);
    }

    /**
     * Starts the show delay when text is set and no overlay is attached.
     */
    private scheduleShow(): void
    {
        this.clearHideTimeout();

        if (!this.lunaTooltip || this.overlayRef !== null)
        {
            return;
        }

        this.clearShowTimeout();

        this.showTimeout = setTimeout(() =>
        {
            this.showTimeout = null;
            this.show();
        }, this.lunaTooltipShowDelay);
    }

    /**
     * Removes the visible class, then destroys the overlay after the CSS fade duration.
     */
    private hideWithFade(): void
    {
        if (this.overlayRef === null)
        {
            return;
        }

        const pane = this.overlayRef.overlayElement;
        pane.classList.remove('luna-tooltip-visible');

        setTimeout(() =>
        {
            this.destroyOverlay();
        }, FADE_OUT_MS);
    }

    /**
     * Creates the overlay, attaches `TooltipComponent`, and toggles the visible class next frame.
     */
    private show(): void
    {
        if (!this.lunaTooltip)
        {
            return;
        }

        const origin = getPositionOrigin(this.elementRef.nativeElement);

        // Prefer below the origin, then above, then sides, without pushing off-screen.
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions([
                { overlayX: 'center', overlayY: 'top', originX: 'center', originY: 'bottom' },
                { overlayX: 'center', overlayY: 'bottom', originX: 'center', originY: 'top' },
                { overlayX: 'start', overlayY: 'center', originX: 'end', originY: 'center' },
                { overlayX: 'end', overlayY: 'center', originX: 'start', originY: 'center' }
            ])
            .withDefaultOffsetY(6)
            .withPush(false);

        this.overlayRef = this.overlay.create({
            panelClass: [ 'luna-tooltip-panel' ],
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            hasBackdrop: false
        });

        const childInjector = Injector.create({
            parent: this.injector,
            providers: [ { provide: LUNA_TOOLTIP_DATA, useValue: this.lunaTooltip } ]
        });

        const portal = new ComponentPortal(TooltipComponent, null, childInjector);
        this.overlayRef.attach(portal);

        // Defer the visible class so the opacity transition runs after the first paint.
        requestAnimationFrame(() =>
        {
            if (this.overlayRef !== null)
            {
                this.overlayRef.overlayElement.classList.add('luna-tooltip-visible');
            }
        });
    }
}
