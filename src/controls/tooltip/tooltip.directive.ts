import {
    Directive,
    ElementRef,
    HostListener,
    inject,
    Input,
    OnDestroy
} from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';

import { TooltipComponent } from './tooltip.component';
import { LUNA_TOOLTIP_DATA } from './tooltip-data';

const FADE_OUT_MS = 120;
const HIDE_DELAY_MS = 250;
const SHOW_DELAY_MS = 60;

@Directive({
    selector: '[lunaTooltip]',
    standalone: true
})
export class TooltipDirective implements OnDestroy
{
    @Input()
    public lunaTooltip: string = '';

    @Input()
    public lunaTooltipHideDelay: number = HIDE_DELAY_MS;

    @Input()
    public lunaTooltipShowDelay: number = SHOW_DELAY_MS;

    private readonly elementRef = inject(ElementRef<HTMLElement>);
    private readonly injector = inject(Injector);
    private readonly overlay = inject(Overlay);

    private hideTimeout: ReturnType<typeof setTimeout> | null = null;
    private overlayRef: ReturnType<Overlay['create']> | null = null;
    private showTimeout: ReturnType<typeof setTimeout> | null = null;

    @HostListener('blur')
    public onBlur(): void
    {
        this.scheduleHide();
    }

    @HostListener('focus')
    public onFocus(): void
    {
        this.scheduleShow();
    }

    @HostListener('mouseenter')
    public onMouseEnter(): void
    {
        this.scheduleShow();
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void
    {
        this.scheduleHide();
    }

    public ngOnDestroy(): void
    {
        this.clearShowTimeout();
        this.clearHideTimeout();
        this.destroyOverlay();
    }

    private clearHideTimeout(): void
    {
        if (this.hideTimeout !== null)
        {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    private clearShowTimeout(): void
    {
        if (this.showTimeout !== null)
        {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }

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

    private show(): void
    {
        if (!this.lunaTooltip)
        {
            return;
        }
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
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

        requestAnimationFrame(() =>
        {
            if (this.overlayRef !== null)
            {
                this.overlayRef.overlayElement.classList.add('luna-tooltip-visible');
            }
        });
    }
}
