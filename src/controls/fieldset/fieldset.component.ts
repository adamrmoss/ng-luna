import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LunaControl } from '../luna-control';

@Component({
    imports: [ CommonModule ],
    selector: 'luna-fieldset',
    standalone: true,
    styleUrls: [ './fieldset.component.scss' ],
    templateUrl: './fieldset.component.html'
})
export class FieldsetComponent extends LunaControl
{
    @Input()
    public legend?: string;
}
