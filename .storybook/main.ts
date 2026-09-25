import type { StorybookConfig } from '@storybook/angular';

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
            from: '../node_modules/@ibm/plex',
            to: '/assets/fonts',
        },
    ],
    stories: [
        '../src/**/*.stories.ts',
    ],
};

export default config;
