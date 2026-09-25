import { FormsModule } from '@angular/forms';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { SelectComponent } from './select.component';

type SelectStoryArgs = {
    change: (value: string) => void;
    disabled: boolean;
    value: string;
};

/**
 * Renders a select whose options are projected and whose value is `ngModel`.
 */
const meta: Meta<SelectStoryArgs> = {
    args: {
        change: fn(),
        disabled: false,
        value: 'green',
    },
    component: SelectComponent,
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `
            <luna-select
                [disabled]="disabled"
                [(ngModel)]="value"
                (change)="change($event)">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </luna-select>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Select',
};

export default meta;

type Story = StoryObj<SelectStoryArgs>;

/**
 * Select bound to the Controls panel.
 */
export const Default: Story = {};
