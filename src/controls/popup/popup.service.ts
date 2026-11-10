import { Injectable, Provider, Type, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LunaSurfaceService } from '../overlay/surface.service';
import { POPUP_DATA } from './popup-data';
import { LunaPopupRef } from './popup-ref';

/**
 * Opens a caller component over the popup backdrop.
 * The caller owns `luna-window` when the surface should look like a window.
 */
@Injectable({ providedIn: 'root' })
export class LunaPopupService
{
    private readonly surfaces = inject(LunaSurfaceService);

    /**
     * Centers `component` on a 25% veil with blur. Backdrop click and Escape close it.
     *
     * @param component - Standalone component to attach.
     * @param config - Optional `POPUP_DATA` value for DI.
     * @returns Stream emitting the `LunaPopupRef.close` result.
     */
    public open<T>(component: Type<unknown>, config?: { data?: unknown }): Observable<T | undefined>
    {
        const providers: Provider[] = [];

        // Optional payload. The component does not receive a title or a width from the service.
        if (config?.data !== undefined)
        {
            providers.push({ provide: POPUP_DATA, useValue: config.data });
        }

        return this.surfaces.mount(
            component as Type<object>,
            'popup',
            LunaPopupRef,
            (onClose) => new LunaPopupRef<T>(onClose),
            providers,
        );
    }
}
