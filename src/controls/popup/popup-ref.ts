import { Observable, Subject } from 'rxjs';

/**
 * Handle for a popup instance. Exposes `afterClosed` and completes the stream on `close`.
 */
export class LunaPopupRef<T = unknown>
{
    private readonly afterClosedSubject = new Subject<T | undefined>();

    /**
     * Emits once with the optional result, then completes when `close` runs.
     */
    public readonly afterClosed: Observable<T | undefined> =
        this.afterClosedSubject.asObservable();

    /**
     * @param onClose - Invoked after subscribers receive the result to detach the overlay.
     */
    public constructor(private readonly onClose: () => void)
    {
    }

    /**
     * Pushes `result` to `afterClosed`, completes the subject, and runs overlay teardown.
     *
     * @param result - Value surfaced to `afterClosed` subscribers.
     */
    public close(result?: T): void
    {
        // Notify listeners before tearing down so they can read a consistent final state.
        this.afterClosedSubject.next(result);
        this.afterClosedSubject.complete();
        this.onClose();
    }
}
