import { Component } from '@angular/core';
import { WindowComponent } from 'ng-luna';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ CommonModule, WindowComponent ],
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent
{
    public title = 'Examle Window';
}

