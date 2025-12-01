import { Component, Input } from '@angular/core';

@Component({
    selector: 'luna-fieldset',
    standalone: true,
    templateUrl: './fieldset.component.html',
    styleUrls: [ './fieldset.component.scss' ]
})
export class FieldsetComponent
{
    @Input()
    public legend?: string;
}
