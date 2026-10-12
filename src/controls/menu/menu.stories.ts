import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn, userEvent, within } from 'storybook/test';

import { FileSvg, TrashSvg } from '../icons';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { type LunaMenuEntry } from './menu-data';
import { LunaMenuTriggerDirective } from './menu-trigger.directive';
import { LunaMenuComponent, type LunaMenuVariant } from './menu.component';

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

const diskItems: LunaMenuEntry[] = [
    { icon: FileSvg, label: 'New File' },
    { icon: TrashSvg, label: 'Delete', tone: 'danger' },
];

type MenuStoryArgs = {
    itemSelect: (item: { label: string } | null) => void;
    items: LunaMenuEntry[];
    label: string;
    variant: LunaMenuVariant;
};

/**
 * Renders a menu opened from a trigger button.
 */
const meta: Meta<MenuStoryArgs> = {
    args: {
        itemSelect: fn(),
        items: fileItems,
        label: 'File',
        variant: 'menubar',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'menubar',
                'context',
            ],
        },
    },
    component: LunaMenuComponent,
    decorators: [
        moduleMetadata({
            imports: [
                LunaMenuTriggerDirective,
                MenuBarComponent,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `
            <luna-menu-bar>
                <luna-menu
                    [items]="items"
                    [variant]="variant"
                    (itemSelect)="itemSelect($event)">
                    <button
                        lunaMenuTrigger
                        type="button">
                        {{ label }}
                    </button>
                </luna-menu>
            </luna-menu-bar>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Menu',
};

export default meta;

type Story = StoryObj<MenuStoryArgs>;

/**
 * File menu with a separator. The panel opens so the rows are on screen.
 */
export const File: Story = {
    play: async ({ canvasElement }) =>
    {
        // The trigger sits on the bar. Open it so the dropdown is visible.
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'File' }));
    },
};

/**
 * View menu with a checked row and a disabled row.
 */
export const View: Story = {
    args: {
        items: viewItems,
        label: 'View',
    },
};

/**
 * Context menu. Rows use mono type, and Delete keeps the danger tone.
 */
export const Context: Story = {
    args: {
        items: diskItems,
        label: 'Disk',
        variant: 'context',
    },
};

/**
 * Rows with icons. Delete uses the danger tone.
 */
export const WithIcons: Story = {
    args: {
        items: diskItems,
        label: 'Disk',
    },
};

/**
 * Opens at the pointer with `openAt` and no trigger child.
 */
export const OpenAtPoint: Story = {
    args: {
        items: diskItems,
    },
    render: (args) => ({
        props: {
            ...args,
            openContext(event: MouseEvent, menu: LunaMenuComponent): void
            {
                // Keep the browser menu closed and open Luna at the pointer.
                event.preventDefault();
                menu.openAt(event.clientX, event.clientY);
            },
        },
        template: `
            <div (contextmenu)="openContext($event, menu)">
                Right-click
                <luna-menu
                    #menu
                    variant="context"
                    [items]="items"
                    (itemSelect)="itemSelect($event)">
                </luna-menu>
            </div>
        `,
    }),
};
