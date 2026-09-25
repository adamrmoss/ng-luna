import { FormsModule } from '@angular/forms';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { TextareaComponent } from './textarea.component';

type TextareaStoryArgs = {
    change: (value: string) => void;
    cols: number;
    disabled: boolean;
    placeholder: string;
    readonly: boolean;
    rows: number;
    value: string;
};

/**
 * Renders a multiline field bound with `ngModel`.
 */
const meta: Meta<TextareaStoryArgs> = {
    args: {
        change: fn(),
        cols: 40,
        disabled: false,
        placeholder: 'Enter a description',
        readonly: false,
        rows: 5,
        value: '',
    },
    component: TextareaComponent,
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `<luna-textarea ${argsToTemplate(args, { exclude: ['value'] })} [(ngModel)]="value"></luna-textarea>`,
    }),
    tags: ['autodocs'],
    title: 'Controls/Textarea',
};

export default meta;

type Story = StoryObj<TextareaStoryArgs>;

/**
 * Textarea bound to the Controls panel.
 */
export const Default: Story = {};
