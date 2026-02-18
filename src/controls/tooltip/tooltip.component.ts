import { Component, inject } from '@angular/core';

import { LUNA_TOOLTIP_DATA } from './tooltip-data';

@Component({
    selector: 'luna-tooltip',
    standalone: true,
    templateUrl: './tooltip.component.html',
    styleUrls: [ './tooltip.component.scss' ]
})
export class TooltipComponent
{
    protected readonly text = inject(LUNA_TOOLTIP_DATA);
}
