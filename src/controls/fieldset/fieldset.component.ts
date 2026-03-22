import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LunaControl } from '../luna-control';

/**
 * Fieldset wrapper that projects content and optionally renders a `<legend>`.
 */
@Component({
    selector: 'luna-fieldset',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './fieldset.component.html',
    styleUrls: [ './fieldset.component.scss' ]
})
export class FieldsetComponent extends LunaControl
{
    /** Text content for the `<legend>`; omitted when unset. */
    @Input()
    public legend?: string;
}
