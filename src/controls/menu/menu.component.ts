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

import { MenuPanelComponent } from './menu-panel.component';
import { LunaMenuEntry, LunaMenuItem } from './menu-data';
import { LUNA_MENU_DATA } from './menu-data';
import { LunaMenuTriggerDirective } from './menu-trigger.directive';

@Component({
    selector: 'luna-menu',
    standalone: true,
    imports: [ LunaMenuTriggerDirective ],
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

    private readonly injector = inject(Injector);
    private readonly overlay = inject(Overlay);

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
        if (this.trigger != null)
        {
            this.trigger.menu = null;
        }
    }

    public open(origin: ElementRef<HTMLElement>): void
    {
        if (this.items.length === 0)
        {
            return;
        }
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
            backdropClass: 'luna-menu-backdrop',
            hasBackdrop: true,
            panelClass: [ 'luna-menu-overlay-panel' ],
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close()
        });

        this.overlayRef.backdropClick().subscribe(() => this.close(null));

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
    }

    private close(selectedItem: LunaMenuItem | null): void
    {
        this.destroyOverlay();
        this.itemSelect.emit(selectedItem);
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
}
