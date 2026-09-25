import type { StorybookConfig } from '@storybook/angular';

import { stageFonts } from '../scripts/stage-fonts.mjs';

stageFonts();

/**
 * Storybook workspace for ng-luna: colocated stories, accessibility checks, and IBM Plex fonts.
 */
const config: StorybookConfig = {
    addons: [
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/angular',
        options: {},
    },
    staticDirs: [
        {
            from: '../.cache/fonts',
            to: '/fonts',
        },
    ],
    stories: [
        '../src/**/*.stories.ts',
    ],
};

export default config;
