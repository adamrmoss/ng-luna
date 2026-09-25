import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { type LunaMenuEntry } from '../menu/menu-data';
import { LunaMenuTriggerDirective } from '../menu/menu-trigger.directive';
import { LunaMenuComponent } from '../menu/menu.component';
import { MenuBarComponent } from './menu-bar.component';

const fileItems: LunaMenuEntry[] = [
    { label: 'New' },
    { label: 'Open...' },
    { label: 'Save' },
    { separator: true },
    { label: 'Exit' },
];

const editItems: LunaMenuEntry[] = [
    { disabled: true, label: 'Undo' },
    { disabled: true, label: 'Redo' },
    { separator: true },
    { label: 'Paste' },
];

type MenuBarStoryArgs = {
    itemSelect: (item: { label: string } | null) => void;
};

/**
 * Renders a menu bar with File and Edit menus.
 */
const meta: Meta<MenuBarStoryArgs> = {
    args: {
        itemSelect: fn(),
    },
    component: MenuBarComponent,
    decorators: [
        moduleMetadata({
            imports: [
                LunaMenuComponent,
                LunaMenuTriggerDirective,
            ],
        }),
    ],
    render: (args) => ({
        props: {
            ...args,
            editItems,
            fileItems,
        },
        template: `
            <luna-menu-bar>
                <luna-menu
                    [items]="fileItems"
                    (itemSelect)="itemSelect($event)">
                    <button
                        lunaMenuTrigger
                        type="button">
                        File
                    </button>
                </luna-menu>
                <luna-menu
                    [items]="editItems"
                    (itemSelect)="itemSelect($event)">
                    <button
                        lunaMenuTrigger
                        type="button">
                        Edit
                    </button>
                </luna-menu>
            </luna-menu-bar>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Menu bar',
};

export default meta;

type Story = StoryObj<MenuBarStoryArgs>;

/**
 * Menu bar. Choosing an item logs `itemSelect`.
 */
export const Default: Story = {};
