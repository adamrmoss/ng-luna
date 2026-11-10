import { moduleMetadata, argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { expect, fn } from 'storybook/test';

import { WindowEntranceComponent } from '../../../.storybook/window-entrance.component';
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
            <luna-window class="demo-window" ${argsToTemplate(args)}>
                <p>Window body. Drag the title bar, then use the caption buttons.</p>
            </luna-window>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Window',
};

export default meta;

type Story = StoryObj<WindowStoryArgs>;

/**
 * Window bound to the Controls panel. Width is on the host. The title bar still drags.
 */
export const Default: Story = {};

/**
 * Maximized window keeps its frame and radius, and the title bar does not drag.
 */
export const Maximized: Story = {
    render: () => ({
        template: `
            <div class="demo-stage">
                <luna-window
                    title="Maximized"
                    [isMaximized]="true"
                    [showMinimize]="false">
                    <p>The frame and radius stay. The title bar does not drag.</p>
                </luna-window>
            </div>
        `,
    }),
};

/**
 * Same stage, with the story canvas setting the window inset so the navy gutter shows.
 */
export const Inset: Story = {
    render: () => ({
        template: `
            <div class="demo-stage demo-inset">
                <luna-window
                    title="Inset"
                    [isMaximized]="true"
                    [showMinimize]="false">
                    <p>The navy gutter is the window inset.</p>
                </luna-window>
            </div>
        `,
    }),
};

/**
 * Maximized outer window and a resting inner window. The outer host is the only `#story-window`.
 */
export const Nested: Story = {
    play: async ({ canvasElement }) =>
    {
        // The id stays on the outer host. The inner window does not copy it.
        const matches = canvasElement.querySelectorAll('#story-window');
        await expect(matches.length).toBe(1);
    },
    render: () => ({
        template: `
            <div class="demo-stage">
                <luna-window
                    id="story-window"
                    title="Outer"
                    [isMaximized]="true"
                    [showMinimize]="false">
                    <luna-window
                        class="demo-window"
                        title="Inner">
                        <p>The inner frame keeps its padding and radius.</p>
                    </luna-window>
                </luna-window>
            </div>
        `,
    }),
};

/**
 * Default title and body colors beside a host that overrides both.
 */
export const Colors: Story = {
    render: () => ({
        template: `
            <luna-window
                class="demo-window"
                title="Default">
                <p>Title white, body black.</p>
            </luna-window>
            <luna-window
                class="demo-window demo-recolor"
                title="Recolored">
                <p>This host sets the title and body colors.</p>
            </luna-window>
        `,
    }),
};

/**
 * Inserts the window with @if so the opacity entrance plays on every open.
 */
export const Entrance: Story = {
    decorators: [
        moduleMetadata({
            imports: [WindowEntranceComponent],
        }),
    ],
    render: () => ({
        template: `<app-window-entrance></app-window-entrance>`,
    }),
};
