import { FormsModule } from '@angular/forms';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { SliderComponent } from './slider.component';

type SliderStoryArgs = {
    boxIndicator: boolean;
    change: (value: number) => void;
    disabled: boolean;
    max: number;
    min: number;
    step: number;
    value: number;
    vertical: boolean;
};

/**
 * Renders a slider bound with `ngModel`.
 */
const meta: Meta<SliderStoryArgs> = {
    args: {
        boxIndicator: false,
        change: fn(),
        disabled: false,
        max: 100,
        min: 0,
        step: 1,
        value: 50,
        vertical: false,
    },
    component: SliderComponent,
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `<luna-slider ${argsToTemplate(args, { exclude: ['value'] })} [(ngModel)]="value"></luna-slider>`,
    }),
    tags: ['autodocs'],
    title: 'Controls/Slider',
};

export default meta;

type Story = StoryObj<SliderStoryArgs>;

/**
 * Slider bound to the Controls panel.
 */
export const Default: Story = {};
