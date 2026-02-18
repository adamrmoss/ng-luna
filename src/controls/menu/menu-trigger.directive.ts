import {
    Directive,
    ElementRef,
    HostListener,
    inject,
    Input
} from '@angular/core';

import { LunaMenuComponent } from './menu.component';

@Directive({
    selector: '[lunaMenuTrigger]',
    standalone: true
})
export class LunaMenuTriggerDirective
{
    private readonly elementRef = inject(ElementRef<HTMLElement>);

    @Input()
    public lunaMenuTrigger: unknown = '';

    public menu: LunaMenuComponent | null = null;

    @HostListener('click', [ '$event' ])
    public onClick(event: Event): void
    {
        event.preventDefault();
        event.stopPropagation();
        this.menu?.open(this.elementRef);
    }
}
