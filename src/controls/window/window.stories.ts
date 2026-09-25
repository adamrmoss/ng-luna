import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { WindowComponent } from './window.component';

type WindowStoryArgs = {
    close: () => void;
    dragDisabled: boolean;
    help: () => void;
    isMaximized: boolean;
    maximize: () => void;
    minimize: () => void;
    restore: () => void;
    scrollable: boolean;
    showClose: boolean;
    showHelp: boolean;
    showMaximize: boolean;
    showMinimize: boolean;
    title: string;
};

/**
 * Renders a window frame with title-bar actions wired to Actions.
 */
const meta: Meta<WindowStoryArgs> = {
    args: {
        close: fn(),
        dragDisabled: false,
        help: fn(),
        isMaximized: false,
        maximize: fn(),
        minimize: fn(),
        restore: fn(),
        scrollable: false,
        showClose: true,
        showHelp: false,
        showMaximize: true,
        showMinimize: true,
        title: 'Untitled',
    },
    component: WindowComponent,
    render: (args) => ({
        props: args,
        template: `
            <luna-window ${argsToTemplate(args)}>
                <p style="width: 420px">Window body. Drag the title bar, then use the caption buttons.</p>
            </luna-window>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Window',
};

export default meta;

type Story = StoryObj<WindowStoryArgs>;

/**
 * Window bound to the Controls panel.
 */
export const Default: Story = {};
