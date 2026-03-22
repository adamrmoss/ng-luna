import {
    Component,
    ContentChild,
    ElementRef,
    inject,
    Input,
    OnDestroy,
    Output,
    EventEmitter,
    AfterContentInit
} from '@angular/core';
import { Injector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { fromEvent, Subscription } from 'rxjs';

import { MenuPanelComponent } from './menu-panel.component';
import { LunaMenuEntry, LunaMenuItem } from './menu-data';
import { LUNA_MENU_DATA } from './menu-data';
import { LunaMenuCoordinatorService } from './menu-coordinator.service';
import { LunaMenuTriggerDirective } from './menu-trigger.directive';

@Component({
    selector: 'luna-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrls: [ './menu.component.scss' ]
})
export class LunaMenuComponent implements AfterContentInit, OnDestroy
{
    @ContentChild(LunaMenuTriggerDirective)
    private trigger: LunaMenuTriggerDirective | undefined;

    @Input()
    public items: LunaMenuEntry[] = [];

    @Output()
    public itemSelect = new EventEmitter<LunaMenuItem | null>();

    private readonly coordinator = inject(LunaMenuCoordinatorService);
    private readonly injector = inject(Injector);
    private readonly overlay = inject(Overlay);

    private outsideClickSubscription: Subscription | null = null;
    private overlayRef: ReturnType<Overlay['create']> | null = null;

    public ngAfterContentInit(): void
    {
        if (this.trigger != null)
        {
            this.trigger.menu = this;
        }
    }

    public ngOnDestroy(): void
    {
        this.destroyOverlay();
        this.coordinator.notifyClosed(this);

        if (this.trigger != null)
        {
            this.trigger.menu = null;
        }
    }

    public dismiss(): void
    {
        this.close(null);
    }

    public isOpen(): boolean
    {
        return this.overlayRef !== null;
    }

    public open(origin: ElementRef<HTMLElement>): void
    {
        if (this.items.length === 0)
        {
            return;
        }

        this.coordinator.notifyOpening(this);
        this.destroyOverlay();

        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions([
                { overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom' },
                { overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top' },
                { overlayX: 'end', overlayY: 'top', originX: 'end', originY: 'bottom' },
                { overlayX: 'end', overlayY: 'bottom', originX: 'end', originY: 'top' }
            ])
            .withDefaultOffsetY(2)
            .withPush(false);

        this.overlayRef = this.overlay.create({
            hasBackdrop: false,
            panelClass: [ 'luna-menu-overlay-panel' ],
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close()
        });

        this.attachOutsideClickListener();

        const childInjector = Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: LUNA_MENU_DATA,
                    useValue: {
                        close: (selectedItem: LunaMenuItem | null) => this.close(selectedItem),
                        items: this.items
                    }
                }
            ]
        });

        const portal = new ComponentPortal(MenuPanelComponent, null, childInjector);
        this.overlayRef.attach(portal);
        this.coordinator.notifyOpened(this);
    }

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
                if (ref.overlayElement.contains(target))
                {
                    return;
                }
                const element = target instanceof Element ? target : target.parentElement;
                if (element?.closest('[lunaMenuTrigger]') != null)
                {
                    return;
                }
                this.close(null);
            }
        );
    }

    private close(selectedItem: LunaMenuItem | null): void
    {
        this.destroyOverlay();
        this.coordinator.notifyClosed(this);
        this.itemSelect.emit(selectedItem);
    }

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
