import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'luna-tab',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './tab.component.html',
    styleUrls: [ './tab.component.scss' ]
})
export class TabComponent
{
    @Input()
    public id!: string;

    @Input()
    public label!: string;

    public active: boolean = false;
}
