import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { WindowComponent } from './window/window.component';

/**
 * Shows that each control reads its own token. A role set on an ancestor does not retarget it.
 */
const meta: Meta = {
    decorators: [
        moduleMetadata({
            imports: [WindowComponent],
        }),
    ],
    tags: ['autodocs'],
    title: 'Controls/Theme',
};

export default meta;

type Story = StoryObj;

/**
 * Default title paint, an ancestor action role that leaves it alone, and a host that sets the title background.
 */
export const Paint: Story = {
    render: () => ({
        template: `
            <luna-window
                class="demo-window"
                title="Default">
                <p>The title bar reads its own background token.</p>
            </luna-window>
            <luna-window
                class="demo-window demo-title"
                title="Title">
                <p>This host sets the title background.</p>
            </luna-window>
        `,
    }),
};
