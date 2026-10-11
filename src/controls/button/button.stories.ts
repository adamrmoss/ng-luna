import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Save, Trash } from 'lucide-static';
import { fn } from 'storybook/test';

import { IconComponent } from '../icons';
import { type LunaTone } from '../luna-tone';
import { ButtonComponent, type ButtonType, type LunaButtonVariant, type LunaSize } from './button.component';

type ButtonStoryArgs = {
    click: (event: MouseEvent) => void;
    disabled: boolean;
    isMaximized: boolean;
    label: string;
    size: LunaSize;
    tone: LunaTone;
    type: ButtonType;
    variant: LunaButtonVariant;
};

/**
 * Renders a button whose label, variant, tone, and size come from Controls.
 */
const meta: Meta<ButtonStoryArgs> = {
    args: {
        click: fn(),
        disabled: false,
        isMaximized: false,
        label: 'Ok',
        size: 'default',
        tone: 'default',
        type: 'button',
        variant: 'default',
    },
    argTypes: {
        size: {
            control: 'select',
            options: [
                'default',
                'compact',
            ],
        },
        tone: {
            control: 'select',
            options: [
                'default',
                'danger',
            ],
        },
        type: {
            control: 'select',
            options: [
                'button',
                'submit',
                'reset',
            ],
        },
        variant: {
            control: 'select',
            options: [
                'default',
                'action',
                'command',
                'icon',
            ],
        },
    },
    component: ButtonComponent,
    decorators: [
        moduleMetadata({
            imports: [
                IconComponent,
            ],
        }),
    ],
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
 * Bordered text button: Ok and Clear Console.
 */
export const Default: Story = {};

/**
 * Mono action button with a 16px glyph.
 */
export const Action: Story = {
    args: {
        label: 'Save',
        variant: 'action',
    },
    render: (args) => ({
        props: {
            ...args,
            saveIcon: Save,
        },
        template: `
            <luna-button ${argsToTemplate(args, { exclude: ['label'] })}>
                <luna-icon size="16" [svg]="saveIcon"></luna-icon>
                {{ label }}
            </luna-button>
        `,
    }),
};

/**
 * Steel command button.
 */
export const Command: Story = {
    args: {
        label: 'Start',
        variant: 'command',
    },
};

/**
 * Square icon button. The glyph is 16px.
 */
export const Icon: Story = {
    args: {
        variant: 'icon',
    },
    render: (args) => ({
        props: {
            ...args,
            saveIcon: Save,
        },
        template: `
            <luna-button ${argsToTemplate(args, { exclude: ['label'] })}>
                <luna-icon size="16" [svg]="saveIcon"></luna-icon>
            </luna-button>
        `,
    }),
};

/**
 * Compact icon button with the danger tint. The glyph stays 16px.
 */
export const IconCompactDanger: Story = {
    args: {
        size: 'compact',
        tone: 'danger',
        variant: 'icon',
    },
    render: (args) => ({
        props: {
            ...args,
            trashIcon: Trash,
        },
        template: `
            <luna-button ${argsToTemplate(args, { exclude: ['label'] })}>
                <luna-icon size="16" [svg]="trashIcon"></luna-icon>
            </luna-button>
        `,
    }),
};
