import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { ProgressComponent } from './progress.component';

type ProgressStoryArgs = {
    max: number;
    value: number;
};

/**
 * Renders a progress bar from `value` and `max`.
 */
const meta: Meta<ProgressStoryArgs> = {
    args: {
        max: 100,
        value: 50,
    },
    component: ProgressComponent,
    render: (args) => ({
        props: args,
        template: `<luna-progress ${argsToTemplate(args)}></luna-progress>`,
    }),
    tags: ['autodocs'],
    title: 'Controls/Progress',
};

export default meta;

type Story = StoryObj<ProgressStoryArgs>;

/**
 * Progress bar bound to the Controls panel.
 */
export const Default: Story = {};
