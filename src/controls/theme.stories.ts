import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { WindowComponent } from './window/window.component';

/**
 * Shows role paint and a token that wins over the role.
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
 * Default paint, a wrapper that changes the action role, and a host that sets the title background alone.
 */
export const Paint: Story = {
    render: () => ({
        template: `
            <luna-window
                class="demo-window"
                title="Default">
                <p>Title bar uses the action color.</p>
            </luna-window>
            <div class="demo-role">
                <luna-window
                    class="demo-window"
                    title="Role">
                    <p>The title bar follows the action color on the wrapper.</p>
                </luna-window>
            </div>
            <luna-window
                class="demo-window demo-specific"
                title="Specific">
                <p>The title background token wins over the role.</p>
            </luna-window>
        `,
    }),
};
