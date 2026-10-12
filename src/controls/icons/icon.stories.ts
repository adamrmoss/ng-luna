import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { HomeSvg, IconComponent, type IconSize } from '.';

type IconStoryArgs = {
    size: IconSize;
    svg: string;
};

/**
 * Renders an icon from a Lucide SVG string and a size token.
 */
const meta: Meta<IconStoryArgs> = {
    args: {
        size: '24',
        svg: HomeSvg,
    },
    argTypes: {
        size: {
            control: 'select',
            options: [
                '12',
                '14',
                '16',
                '20',
                '24',
                '32',
                '48',
            ],
        },
    },
    component: IconComponent,
    render: (args) => ({
        props: args,
        template: `<luna-icon ${argsToTemplate(args)}></luna-icon>`,
    }),
    tags: ['autodocs'],
    title: 'Controls/Icon',
};

export default meta;

type Story = StoryObj<IconStoryArgs>;

/**
 * Home icon at the size chosen in Controls. Replace `svg` with any Lucide markup string.
 */
export const Default: Story = {};
