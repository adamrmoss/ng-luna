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
 * Root service that opens Luna modal overlays and typed message box helpers.
 */

/**
 * Opens CDK overlay modals with backdrop; supports message boxes and arbitrary components.
 */
@Injectable({ providedIn: 'root' })
export class LunaModalService
{
    private readonly overlay = inject(Overlay);

    private readonly injector = inject(Injector);

    private isMessageBoxOpen = false;

    /**
     * Shows an alert dialog; completes when dismissed.
     *
     * @param message - Body text.
     * @param titleOrOptions - Window title string or extended options.
     * @returns Stream that emits when the dialog closes.
     */
    public alert(message: string, titleOrOptions?: string | MessageBoxOptions<void>): Observable<void | undefined>
    {
        const data = this.normalizeMessageBoxData(message, 'alert', titleOrOptions);

        return this.openMessageBox(data) as Observable<void | undefined>;
    }

    /**
     * Shows an alert with typed `okValue` via options.
     *
     * @param message - Body text.
     * @param options - Optional labels and return payload.
     * @returns Stream emitting the chosen value or undefined.
     */
    public alertWith<T>(message: string, options?: MessageBoxOptions<T>): Observable<T | undefined>
    {
        const data = this.normalizeMessageBoxData(message, 'alert', options);

        return this.openMessageBox(data);
    }

    /**
     * Shows a confirm dialog defaulting to boolean OK/cancel.
     *
     * @param message - Body text.
     * @param titleOrOptions - Title string or options with custom return values.
     * @returns Stream emitting true/false or undefined if dismissed unexpectedly.
     */
    public confirm(message: string, titleOrOptions?: string | MessageBoxOptions<boolean>): Observable<boolean>
    {
        const data = this.normalizeMessageBoxData(message, 'confirm', titleOrOptions);

        return this.openMessageBox(data) as Observable<boolean>;
    }

    /**
     * Shows a confirm dialog with fully custom OK/cancel payloads.
     *
     * @param message - Body text.
     * @param options - Button labels and typed values.
     * @returns Stream emitting the resolved branch value.
     */
    public confirmWith<T>(message: string, options: MessageBoxOptions<T>): Observable<T | undefined>
    {
        const data: MessageBoxData<T> = {
            message,
            options,
            type: 'confirm'
        };

        return this.openMessageBox(data);
    }

    /**
     * Shows a prompt dialog returning `MessageBoxReturnData`.
     *
     * @param message - Body text or field label context.
     * @param titleOrOptions - Title string or field/label options.
     * @returns Stream emitting structured prompt outcome.
     */
    public prompt(message: string, titleOrOptions?: string | MessageBoxOptions<MessageBoxReturnData>): Observable<MessageBoxReturnData>
    {
        const data = this.normalizeMessageBoxData(message, 'prompt', titleOrOptions);

        return this.openMessageBox(data) as Observable<MessageBoxReturnData>;
    }

    /**
     * Shows a prompt with explicit placeholder and default filename-style options.
     *
     * @param message - Body text.
     * @param options - Field defaults and button labels.
     * @returns Stream emitting structured prompt outcome.
     */
    public promptWith(message: string, options?: MessageBoxOptions<MessageBoxReturnData>): Observable<MessageBoxReturnData>
    {
        const data: MessageBoxData<MessageBoxReturnData> = {
            message,
            options,
            type: 'prompt'
        };

        return this.openMessageBox(data) as Observable<MessageBoxReturnData>;
    }

    /**
     * Opens a custom component inside the standard modal shell.
     *
     * @param component - Standalone component type to attach.
     * @param config - Optional `MODAL_DATA` value for DI.
     * @returns Stream emitting the `LunaModalRef.close` result.
     */
    public open<T>(component: Type<unknown>, config?: { data?: unknown }): Observable<T | undefined>
    {
        // Center a modal pane with backdrop and block scroll behind it.
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

        // Tie overlay disposal to `close` so callers always get a single `afterClosed` emission.
        const ref = new LunaModalRef<T>(() =>
        {
            overlayRef.detach();
            overlayRef.dispose();
        });

        const providers: Provider[] = [ { provide: LunaModalRef, useValue: ref } ];

        // Optional arbitrary payload for custom dialog content.
        if (config?.data !== undefined)
        {
            providers.push({ provide: MODAL_DATA, useValue: config.data });
        }

        const injector = Injector.create({
            parent: this.injector,
            providers
        });

        const portal = new ComponentPortal(component as Type<object>, null, injector);

        // Attach after injector wiring so the component resolves `LunaModalRef` and `MODAL_DATA`.
        overlayRef.attach(portal);

        return ref.afterClosed as Observable<T | undefined>;
    }

    /**
     * Normalizes legacy title-only overloads into a single `MessageBoxData` shape.
     *
     * @param message - Body text.
     * @param type - Message box variant.
     * @param titleOrOptions - Title string, options object, or omitted.
     * @returns Data object for the portal injector.
     */
    private normalizeMessageBoxData<T>(
        message: string,
        type: 'alert' | 'confirm' | 'prompt',
        titleOrOptions?: string | MessageBoxOptions<T>
    ): MessageBoxData<T>
    {
        // Minimal shape when the caller passes only message and type.
        if (titleOrOptions === undefined)
        {
            return { message, type };
        }

        // Legacy overload: second positional argument is the window title.
        if (typeof titleOrOptions === 'string')
        {
            return { message, title: titleOrOptions, type };
        }

        // Full options object (labels, return values, prompt defaults).
        return { message, options: titleOrOptions, type };
    }

    /**
     * Creates the overlay, attaches `MessageBoxComponent`, and exposes `afterClosed`.
     *
     * @param data - Injected configuration for the message box instance.
     * @returns Observable of the close result, or `EMPTY` if a box is already open.
     */
    private openMessageBox<T>(data: MessageBoxData<T>): Observable<T | undefined>
    {
        // Single-flight message boxes so stacked prompts cannot corrupt shared state.
        if (this.isMessageBoxOpen)
        {
            return EMPTY;
        }

        this.isMessageBoxOpen = true;

        // Same centered shell as generic `open`, dedicated to the message box component.
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
}
