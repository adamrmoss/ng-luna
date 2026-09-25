import { FormsModule } from '@angular/forms';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { CheckboxComponent } from './checkbox.component';

type CheckboxStoryArgs = {
    change: (checked: boolean) => void;
    checked: boolean;
    disabled: boolean;
    label: string;
};

/**
 * Renders a checkbox bound with `ngModel`.
 */
const meta: Meta<CheckboxStoryArgs> = {
    args: {
        change: fn(),
        checked: false,
        disabled: false,
        label: 'Enable notifications',
    },
    component: CheckboxComponent,
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `<luna-checkbox ${argsToTemplate(args, { exclude: ['checked'] })} [(ngModel)]="checked"></luna-checkbox>`,
    }),
    tags: ['autodocs'],
    title: 'Controls/Checkbox',
};

export default meta;

type Story = StoryObj<CheckboxStoryArgs>;

/**
 * Checkbox bound to the Controls panel.
 */
export const Default: Story = {};
