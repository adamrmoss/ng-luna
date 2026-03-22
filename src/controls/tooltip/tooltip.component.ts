import { Component, inject } from '@angular/core';

import { LUNA_TOOLTIP_DATA } from './tooltip-data';

/**
 * Standalone overlay surface that binds injected tooltip text in the template.
 */

/**
 * Overlay panel that displays plain text from `LUNA_TOOLTIP_DATA`.
 */
@Component({
    selector: 'luna-tooltip',
    standalone: true,
    templateUrl: './tooltip.component.html',
    styleUrls: [ './tooltip.component.scss' ]
})
export class TooltipComponent
{
    /** Tooltip string provided by `TooltipDirective` via DI. */
    protected readonly text = inject(LUNA_TOOLTIP_DATA);
}
