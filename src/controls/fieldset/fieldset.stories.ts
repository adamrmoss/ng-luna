import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { InputComponent } from '../input/input.component';
import { FieldsetComponent } from './fieldset.component';

type FieldsetStoryArgs = {
    disabled: boolean;
    legend: string;
};

/**
 * Renders a fieldset around a sample input.
 */
const meta: Meta<FieldsetStoryArgs> = {
    args: {
        disabled: false,
        legend: 'User information',
    },
    component: FieldsetComponent,
    decorators: [
        moduleMetadata({
            imports: [
                InputComponent,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `
            <luna-fieldset ${argsToTemplate(args)}>
                <luna-input placeholder="First name"></luna-input>
            </luna-fieldset>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Fieldset',
};

export default meta;

type Story = StoryObj<FieldsetStoryArgs>;

/**
 * Fieldset with a projected input.
 */
export const Default: Story = {};
