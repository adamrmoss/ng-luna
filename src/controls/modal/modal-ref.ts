import { Observable, Subject } from 'rxjs';

export class LunaModalRef<T = unknown>
{
    private readonly afterClosedSubject = new Subject<T | undefined>();

    public readonly afterClosed: Observable<T | undefined> =
        this.afterClosedSubject.asObservable();

    constructor(private readonly onClose: () => void) {}

    public close(result?: T): void
    {
        this.afterClosedSubject.next(result);
        this.afterClosedSubject.complete();
        this.onClose();
    }
}
