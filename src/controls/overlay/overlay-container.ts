import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

/**
 * CDK `OverlayContainer` that can redirect overlay roots into a custom DOM subtree.
 */
@Injectable()
export class LunaOverlayContainer extends OverlayContainer
{
    private customContainerElement: HTMLElement | null = null;

    /**
     * Pins future overlay attachment to `element` instead of the document body.
     *
     * @param element - Host element that should contain overlay panes.
     */
    public setContainerElement(element: HTMLElement): void
    {
        this.customContainerElement = element;
    }

    /**
     * @returns The custom host when set; otherwise the default CDK container.
     */
    public override getContainerElement(): HTMLElement
    {
        // Prefer the Luna host so overlays stack under the app shell when configured.
        if (this.customContainerElement != null)
        {
            return this.customContainerElement;
        }

        return super.getContainerElement();
    }
}
