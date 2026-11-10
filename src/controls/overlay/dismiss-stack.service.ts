import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

/**
 * Orders Escape across menus, message boxes, modals, and popups.
 * The most recently pushed handler is the top surface.
 */
@Injectable({ providedIn: 'root' })
export class LunaDismissStack
{
    private readonly handlers: Array<() => void> = [];

    private keydown: Subscription | null = null;

    /**
     * Starts the document listener once, in the browser.
     */
    public constructor()
    {
        // Storybook and apps run in a browser. Skip the listener when document is absent.
        if (typeof document === 'undefined')
        {
            return;
        }

        this.keydown = fromEvent<KeyboardEvent>(document, 'keydown').subscribe((event) =>
        {
            this.onKeydown(event);
        });
    }

    /**
     * Pushes a close handler and returns the function that removes it.
     *
     * @param handler - Closes the surface that just opened.
     * @returns Unregister function. Safe to call more than once.
     */
    public push(handler: () => void): () => void
    {
        this.handlers.push(handler);

        let removed = false;

        return () =>
        {
            // A second release, from destroy after close, must not drop a different surface.
            if (removed)
            {
                return;
            }

            removed = true;
            const index = this.handlers.lastIndexOf(handler);

            if (index >= 0)
            {
                this.handlers.splice(index, 1);
            }
        };
    }

    /**
     * Closes only the top surface.
     *
     * @param event - Document keydown.
     */
    private onKeydown(event: KeyboardEvent): void
    {
        // Other keys stay with the control that owns them. Enter on a message box is one of those.
        if (event.key !== 'Escape')
        {
            return;
        }

        const top = this.handlers[this.handlers.length - 1];

        if (top == null)
        {
            return;
        }

        event.preventDefault();
        top();
    }
}
