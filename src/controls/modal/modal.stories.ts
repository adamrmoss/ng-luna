import { type Meta, type StoryObj } from '@storybook/angular';

import { ModalStoryComponent } from '../../../.storybook/modal-story.component';

/**
 * Renders buttons that open alert, confirm, and prompt dialogs.
 */
const meta: Meta<ModalStoryComponent> = {
    component: ModalStoryComponent,
    tags: ['autodocs'],
    title: 'Controls/Modal',
};

export default meta;

type Story = StoryObj<ModalStoryComponent>;

/**
 * Modal service dialogs. Results appear under the buttons.
 */
export const Dialogs: Story = {};
