import { bootstrapApplication } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { LunaOverlayContainer } from 'ng-luna';

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        { provide: OverlayContainer, useClass: LunaOverlayContainer }
    ]
}).catch(err => console.error(err));

