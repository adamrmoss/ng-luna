import { Component, Input } from '@angular/core';
import { LunaControl } from '../luna-control';

@Component({
    selector: 'luna-fieldset',
    standalone: true,
    templateUrl: './fieldset.component.html',
    styleUrls: [ './fieldset.component.scss' ]
})
export class FieldsetComponent extends LunaControl
{
    @Input()
    public legend?: string;
}
