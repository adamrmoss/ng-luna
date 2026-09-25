import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { ButtonComponent, type ButtonType } from './button.component';

type ButtonStoryArgs = {
    click: (event: MouseEvent) => void;
    disabled: boolean;
    isMaximized: boolean;
    label: string;
    type: ButtonType;
};

/**
 * Renders a button whose label, type, and disabled state come from Controls.
 */
const meta: Meta<ButtonStoryArgs> = {
    args: {
        click: fn(),
        disabled: false,
        isMaximized: false,
        label: 'Default Button',
        type: 'button',
    },
    argTypes: {
        type: {
            control: 'select',
            options: [
                'button',
                'submit',
                'reset',
            ],
        },
    },
    component: ButtonComponent,
    render: (args) => ({
        props: args,
        template: `<luna-button ${argsToTemplate(args, { exclude: ['label'] })}>{{ label }}</luna-button>`,
    }),
    tags: ['autodocs'],
    title: 'Controls/Button',
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

/**
 * Interactive button bound to the Controls panel.
 */
export const Default: Story = {};
