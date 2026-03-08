import { Injectable, Injector, inject, Type, Provider } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { EMPTY, Observable } from 'rxjs';

import { LunaModalRef } from './modal-ref';
import { MODAL_DATA } from './modal-data';
import { MessageBoxComponent } from './message-box.component';
import {
    MESSAGE_BOX_DATA,
    MessageBoxData,
    MessageBoxOptions,
    MessageBoxReturnData
} from './message-box-data';

/**
 * Service for showing modal dialogs with a dimmed backdrop. No template markup required.
 * Requires OverlayModule to be imported and LunaOverlayComponent to be placed in the app (e.g. in
 * the root template). Provide LunaOverlayContainer so overlays render inside the component.
 */
@Injectable({ providedIn: 'root' })
export class LunaModalService
{
    private readonly overlay = inject(Overlay);
    private readonly injector = inject(Injector);
    private isMessageBoxOpen = false;

    public alert(message: string, titleOrOptions?: string | MessageBoxOptions<void>): Observable<void | undefined>
    {
        const data = this.normalizeMessageBoxData(message, 'alert', titleOrOptions);
        return this.openMessageBox(data) as Observable<void | undefined>;
    }

    public alertWith<T>(message: string, options?: MessageBoxOptions<T>): Observable<T | undefined>
    {
        const data = this.normalizeMessageBoxData(message, 'alert', options);
        return this.openMessageBox(data);
    }

    public confirm(message: string, titleOrOptions?: string | MessageBoxOptions<boolean>): Observable<boolean>
    {
        const data = this.normalizeMessageBoxData(message, 'confirm', titleOrOptions);
        return this.openMessageBox(data) as Observable<boolean>;
    }

    public confirmWith<T>(message: string, options: MessageBoxOptions<T>): Observable<T | undefined>
    {
        const data: MessageBoxData<T> = {
            message,
            options,
            type: 'confirm'
        };
        return this.openMessageBox(data);
    }

    public prompt(message: string, titleOrOptions?: string | MessageBoxOptions<MessageBoxReturnData>): Observable<MessageBoxReturnData>
    {
        const data = this.normalizeMessageBoxData(message, 'prompt', titleOrOptions);
        return this.openMessageBox(data) as Observable<MessageBoxReturnData>;
    }

    public promptWith(message: string, options?: MessageBoxOptions<MessageBoxReturnData>): Observable<MessageBoxReturnData>
    {
        const data: MessageBoxData<MessageBoxReturnData> = {
            message,
            options,
            type: 'prompt'
        };
        return this.openMessageBox(data) as Observable<MessageBoxReturnData>;
    }

    private normalizeMessageBoxData<T>(
        message: string,
        type: 'alert' | 'confirm' | 'prompt',
        titleOrOptions?: string | MessageBoxOptions<T>
    ): MessageBoxData<T>
    {
        if (titleOrOptions === undefined)
        {
            return { message, type };
        }
        if (typeof titleOrOptions === 'string')
        {
            return { message, title: titleOrOptions, type };
        }
        return { message, options: titleOrOptions, type };
    }

    private openMessageBox<T>(data: MessageBoxData<T>): Observable<T | undefined>
    {
        if (this.isMessageBoxOpen)
        {
            return EMPTY;
        }
        this.isMessageBoxOpen = true;

        const cancelValue = data.type === 'confirm'
            ? (data.options?.cancelValue ?? (false as T))
            : data.type === 'prompt'
                ? ({ button: 'cancel' } as T)
                : undefined;
        const overlayRef = this.overlay.create({
            backdropClass: 'luna-modal-backdrop',
            hasBackdrop: true,
            panelClass: 'luna-modal-pane',
            positionStrategy: this.overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically(),
            scrollStrategy: this.overlay.scrollStrategies.block()
        });

        const ref = new LunaModalRef<T | undefined>(() =>
        {
            this.isMessageBoxOpen = false;
            overlayRef.detach();
            overlayRef.dispose();
        });

        const injector = Injector.create({
            parent: this.injector,
            providers: [
                { provide: MESSAGE_BOX_DATA, useValue: data },
                { provide: LunaModalRef, useValue: ref }
            ]
        });

        const portal = new ComponentPortal(MessageBoxComponent, null, injector);
        overlayRef.attach(portal);

        return ref.afterClosed;
    }

    public open<T>(component: Type<unknown>, config?: { data?: unknown }): Observable<T | undefined>
    {
        const overlayRef = this.overlay.create({
            backdropClass: 'luna-modal-backdrop',
            hasBackdrop: true,
            panelClass: 'luna-modal-pane',
            positionStrategy: this.overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically(),
            scrollStrategy: this.overlay.scrollStrategies.block()
        });

        const ref = new LunaModalRef<T>(() =>
        {
            overlayRef.detach();
            overlayRef.dispose();
        });

        const providers: Provider[] = [{ provide: LunaModalRef, useValue: ref }];
        if (config?.data !== undefined)
        {
            providers.push({ provide: MODAL_DATA, useValue: config.data });
        }

        const injector = Injector.create({
            parent: this.injector,
            providers
        });

        const portal = new ComponentPortal(component as Type<object>, null, injector);
        overlayRef.attach(portal);

        return ref.afterClosed as Observable<T | undefined>;
    }
}
