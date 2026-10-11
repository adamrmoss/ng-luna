import { Component, HostBinding, Input } from '@angular/core';

/**
 * Toolbar arrangement. Each value owns its padding, gap, and bar paint.
 */
export type LunaToolbarVariant = 'cluster' | 'editor' | 'command' | 'end' | 'float';

/**
 * Horizontal bar that groups buttons. The variant selects the bar metrics.
 */
@Component({
    selector: 'luna-toolbar',
    standalone: true,
    templateUrl: './toolbar.component.html',
    styleUrls: [ './toolbar.component.scss' ],
})
export class ToolbarComponent
{
    /** Bar metrics. Editor groups set their own gaps. */
    @Input()
    @HostBinding('attr.variant')
    public variant: LunaToolbarVariant = 'cluster';
}
