import { OverlayContainer } from '@angular/cdk/overlay';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LunaOverlayContainer } from 'ng-luna';

import { AppComponent } from './app/app.component';

/**
 * Boots the ng-luna demo app with animations and Luna overlay container binding.
 */

// Wire CDK overlays to `LunaOverlayContainer` so panes render under `luna-overlay` in the shell.
bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        { provide: OverlayContainer, useClass: LunaOverlayContainer },
    ],
}).catch((err: unknown) =>
{
    // Surface bootstrap failures in the console; the shell cannot run without a successful boot.
    console.error(err);
});
