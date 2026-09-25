import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { type LunaMenuEntry } from './menu-data';
import { LunaMenuTriggerDirective } from './menu-trigger.directive';
import { LunaMenuComponent } from './menu.component';

const fileItems: LunaMenuEntry[] = [
    { label: 'New' },
    { label: 'Open...' },
    { label: 'Save' },
    { separator: true },
    { label: 'Exit' },
];

const viewItems: LunaMenuEntry[] = [
    { checked: true, label: 'Toolbar' },
    { checked: false, label: 'Status Bar' },
    { separator: true },
    { disabled: true, label: 'Refresh' },
];

type MenuStoryArgs = {
    itemSelect: (item: { label: string } | null) => void;
    items: LunaMenuEntry[];
    label: string;
};

/**
 * Renders a menu opened from a trigger button.
 */
const meta: Meta<MenuStoryArgs> = {
    args: {
        itemSelect: fn(),
        items: fileItems,
        label: 'File',
    },
    component: LunaMenuComponent,
    decorators: [
        moduleMetadata({
            imports: [
                LunaMenuTriggerDirective,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `
            <luna-menu
                [items]="items"
                (itemSelect)="itemSelect($event)">
                <button
                    lunaMenuTrigger
                    type="button">
                    {{ label }}
                </button>
            </luna-menu>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Menu',
};

export default meta;

type Story = StoryObj<MenuStoryArgs>;

/**
 * File menu with a separator.
 */
export const File: Story = {};

/**
 * View menu with a checked row and a disabled row.
 */
export const View: Story = {
    args: {
        items: viewItems,
        label: 'View',
    },
};
