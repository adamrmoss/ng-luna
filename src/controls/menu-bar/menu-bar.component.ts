import { Component } from '@angular/core';

import { LunaControl } from '../luna-control';

/**
 * Horizontal container for menu triggers sharing `LunaControl` disabled semantics.
 */
@Component({
    selector: 'luna-menu-bar',
    standalone: true,
    templateUrl: './menu-bar.component.html',
    styleUrls: [ './menu-bar.component.scss' ]
})
export class MenuBarComponent extends LunaControl
{
}
