import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable()
export class LunaOverlayContainer extends OverlayContainer
{
    private customContainerElement: HTMLElement | null = null;

    public setContainerElement(element: HTMLElement): void
    {
        this.customContainerElement = element;
    }

    public override getContainerElement(): HTMLElement
    {
        if (this.customContainerElement != null)
        {
            return this.customContainerElement;
        }
        return super.getContainerElement();
    }
}
