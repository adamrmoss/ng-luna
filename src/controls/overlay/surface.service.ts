import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Provider, Type, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { LunaDismissStack } from './dismiss-stack.service';

/**
 * Which fixed backdrop a surface uses.
 */
export type LunaSurfaceKind = 'modal' | 'popup';

/**
 * Close handle returned by a surface ref.
 */
export interface LunaSurfaceHandle<T>
{
    /** Stream that emits once when the surface closes. */
    afterClosed: Observable<T | undefined>;

    /**
     * Closes the surface with an optional result.
     *
     * @param result - Value emitted to subscribers.
     */
    close(result?: T): void;
}

/**
 * Builds the shared centered overlay for modals and popups.
 */
@Injectable({ providedIn: 'root' })
export class LunaSurfaceService
{
    private readonly dismissStack = inject(LunaDismissStack);

    private readonly injector = inject(Injector);

    private readonly overlay = inject(Overlay);

    /**
     * Attaches a component over the backdrop for `kind` and returns its close stream.
     *
     * @param component - Standalone component to attach.
     * @param kind - Modal is a 50% veil. Popup is a 25% veil plus blur, and a backdrop click closes it.
     * @param refToken - DI token for the close handle (`LunaModalRef` or `LunaPopupRef`).
     * @param createRef - Builds the handle. Its callback runs once, when the surface is torn down.
     * @param extraProviders - Additional injector entries, such as a data token.
     * @returns Stream that emits the close result.
     */
    public mount<T>(
        component: Type<object>,
        kind: LunaSurfaceKind,
        refToken: Type<unknown>,
        createRef: (onClose: () => void) => LunaSurfaceHandle<T>,
        extraProviders: Provider[] = [],
    ): Observable<T | undefined>
    {
        const backdropClass = kind === 'modal' ? 'luna-modal-backdrop' : 'luna-popup-backdrop';
        const panelClass = kind === 'modal' ? 'luna-modal-pane' : 'luna-popup-pane';

        // Center the pane and block scroll behind it. Each surface gets its own backdrop.
        const overlayRef = this.overlay.create({
            backdropClass,
            hasBackdrop: true,
            panelClass,
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
            scrollStrategy: this.overlay.scrollStrategies.block(),
        });

        let release = (): void =>
        {
        };
        const ref = createRef(() =>
        {
            release();
            overlayRef.detach();
            overlayRef.dispose();
        });

        // Escape closes every surface. A backdrop click closes a popup only.
        release = this.watch(overlayRef, kind, () =>
        {
            ref.close();
        });

        const injector = Injector.create({
            parent: this.injector,
            providers: [
                { provide: refToken, useValue: ref },
                ...extraProviders,
            ],
        });

        overlayRef.attach(new ComponentPortal(component, null, injector));

        return ref.afterClosed;
    }

    /**
     * Subscribes dismiss gestures and returns a one-shot release.
     *
     * @param overlayRef - Overlay whose backdrop may close a popup.
     * @param kind - Selects whether a backdrop click closes the surface.
     * @param close - Tears the surface down.
     * @returns Unregister function.
     */
    private watch(overlayRef: OverlayRef, kind: LunaSurfaceKind, close: () => void): () => void
    {
        const releaseEscape = this.dismissStack.push(close);
        let backdrop: Subscription | null = null;

        // Popup identity includes click-away. Modal does not.
        if (kind === 'popup')
        {
            backdrop = overlayRef.backdropClick().subscribe(() =>
            {
                close();
            });
        }

        let released = false;

        return () =>
        {
            if (released)
            {
                return;
            }

            released = true;
            releaseEscape();
            backdrop?.unsubscribe();
        };
    }
}
