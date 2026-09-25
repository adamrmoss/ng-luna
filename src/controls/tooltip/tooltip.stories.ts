import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from './tooltip.directive';

type TooltipStoryArgs = {
    lunaTooltip: string;
    lunaTooltipHideDelay: number;
    lunaTooltipShowDelay: number;
};

/**
 * Renders a button that shows a tooltip from the `lunaTooltip` directive.
 */
const meta: Meta<TooltipStoryArgs> = {
    args: {
        lunaTooltip: 'Save the document',
        lunaTooltipHideDelay: 250,
        lunaTooltipShowDelay: 60,
    },
    component: ButtonComponent,
    decorators: [
        moduleMetadata({
            imports: [
                TooltipDirective,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `
            <luna-button
                [lunaTooltip]="lunaTooltip"
                [lunaTooltipHideDelay]="lunaTooltipHideDelay"
                [lunaTooltipShowDelay]="lunaTooltipShowDelay"
                type="button">
                Hover
            </luna-button>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Tooltip',
};

export default meta;

type Story = StoryObj<TooltipStoryArgs>;

/**
 * Hover or focus the button to open the tooltip.
 */
export const Default: Story = {};
