import { FormsModule } from '@angular/forms';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { InputComponent, type InputType } from './input.component';

type InputStoryArgs = {
    change: (value: string) => void;
    disabled: boolean;
    placeholder: string;
    readonly: boolean;
    type: InputType;
    value: string;
};

/**
 * Renders a text field bound with `ngModel`.
 */
const meta: Meta<InputStoryArgs> = {
    args: {
        change: fn(),
        disabled: false,
        placeholder: 'Type here',
        readonly: false,
        type: 'text',
        value: '',
    },
    argTypes: {
        type: {
            control: 'select',
            options: [
                'text',
                'password',
                'email',
            ],
        },
    },
    component: InputComponent,
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `<luna-input ${argsToTemplate(args, { exclude: ['value'] })} [(ngModel)]="value"></luna-input>`,
    }),
    tags: ['autodocs'],
    title: 'Controls/Input',
};

export default meta;

type Story = StoryObj<InputStoryArgs>;

/**
 * Single-line input bound to the Controls panel.
 */
export const Default: Story = {};
