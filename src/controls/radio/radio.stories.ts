import { FormsModule } from '@angular/forms';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { FieldsetComponent } from '../fieldset/fieldset.component';
import { RadioComponent } from './radio.component';

const emitChange = fn();

type RadioStoryArgs = {
    change: (value: string) => void;
    disabled: boolean;
    legend: string;
    selected: string;
};

/**
 * Renders a radio group bound to one `ngModel` value.
 */
const meta: Meta<RadioStoryArgs> = {
    args: {
        change: emitChange,
        disabled: false,
        legend: 'Choose an option',
        selected: 'option1',
    },
    component: RadioComponent,
    decorators: [
        moduleMetadata({
            imports: [
                FieldsetComponent,
                FormsModule,
                RadioComponent,
            ],
        }),
    ],
    render: (args) => ({
        props: {
            ...args,
            emitChange,
        },
        template: `
            <luna-fieldset [legend]="legend">
                <div class="demo-radios">
                    <luna-radio
                        [disabled]="disabled"
                        label="Option 1"
                        name="radio-story"
                        value="option1"
                        [(ngModel)]="selected"
                        (change)="emitChange($event)">
                    </luna-radio>
                    <luna-radio
                        [disabled]="disabled"
                        label="Option 2"
                        name="radio-story"
                        value="option2"
                        [(ngModel)]="selected"
                        (change)="emitChange($event)">
                    </luna-radio>
                    <luna-radio
                        [disabled]="disabled"
                        label="Option 3"
                        name="radio-story"
                        value="option3"
                        [(ngModel)]="selected"
                        (change)="emitChange($event)">
                    </luna-radio>
                </div>
            </luna-fieldset>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Radio',
};

export default meta;

type Story = StoryObj<RadioStoryArgs>;

/**
 * Three options sharing one selected value.
 */
export const Group: Story = {};
