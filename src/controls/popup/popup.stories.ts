import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { PopupStoryComponent } from '../../../.storybook/popup-story.component';

/**
 * Opens a caller-owned window on the popup veil.
 */
const meta: Meta = {
    tags: ['autodocs'],
    title: 'Controls/Popup',
};

export default meta;

type Story = StoryObj;

/**
 * 25% veil plus blur. Backdrop click and Escape both close it, and the result line updates.
 */
export const Publication: Story = {
    decorators: [
        moduleMetadata({
            imports: [PopupStoryComponent],
        }),
    ],
    render: () => ({
        template: `<app-popup-story></app-popup-story>`,
    }),
};
