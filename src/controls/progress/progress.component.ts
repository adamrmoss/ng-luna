import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'luna-progress',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './progress.component.html',
    styleUrls: [ './progress.component.scss' ]
})
export class ProgressComponent
{
    @Input()
    public value?: number;

    @Input()
    public max = 100;
}
