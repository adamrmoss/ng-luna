import { OverlayContainer } from '@angular/cdk/overlay';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, componentWrapperDecorator, moduleMetadata, type Preview } from '@storybook/angular';

import { LunaOverlayContainer, OverlayComponent } from '../src/controls/overlay';

/**
 * Storybook preview: Luna overlay host and animation providers for every story.
 */
const preview: Preview = {
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                {
                    provide: OverlayContainer,
                    useClass: LunaOverlayContainer,
                },
            ],
        }),
        moduleMetadata({
            imports: [
                OverlayComponent,
            ],
        }),
        componentWrapperDecorator((story) => `<luna-overlay></luna-overlay>${story}`),
    ],
};

export default preview;
