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

/**
 * Renders a DOM host and, when paired with `LunaOverlayContainer`, receives CDK overlays.
 */
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

    /**
     * Registers the projected host element on the Luna overlay container when types match.
     */
    public ngAfterViewInit(): void
    {
        // Only custom Luna container instances accept redirection; ignore the default CDK token.
        if (this.overlayContainer instanceof LunaOverlayContainer)
        {
            this.overlayContainer.setContainerElement(this.hostRef.nativeElement);
        }
    }
}
