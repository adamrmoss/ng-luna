import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Declarative tab pane registered by `luna-tabs` via content projection.
 */
@Component({
    selector: 'luna-tab',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './tab.component.html',
    styleUrls: [ './tab.component.scss' ]
})
export class TabComponent
{
    /** Stable id matched by `TabsComponent.activeTabId` and selection APIs. */
    @Input()
    public id!: string;

    /** Short label shown on the corresponding tab button. */
    @Input()
    public label!: string;

    /** True when this tab is the visible panel. */
    public active: boolean = false;
}
