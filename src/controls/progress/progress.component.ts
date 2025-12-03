import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LunaControl } from '../luna-control';

@Component({
    selector: 'luna-progress',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './progress.component.html',
    styleUrls: [ './progress.component.scss' ]
})
export class ProgressComponent extends LunaControl
{
    @Input()
    public max = 100;

    @Input()
    public value?: number;
}
