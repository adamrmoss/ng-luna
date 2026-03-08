import {
    AfterViewInit,
    Component,
    ElementRef,
    inject,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { LunaOverlayContainer } from './overlay-container';

@Component({
    selector: 'luna-overlay',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './overlay.component.html',
    styleUrls: [ './overlay.component.scss' ]
})
export class OverlayComponent implements AfterViewInit
{
    @ViewChild('host')
    private hostRef!: ElementRef<HTMLElement>;

    private readonly overlayContainer = inject(OverlayContainer);

    public ngAfterViewInit(): void
    {
        if (this.overlayContainer instanceof LunaOverlayContainer)
        {
            this.overlayContainer.setContainerElement(this.hostRef.nativeElement);
        }
    }
}
