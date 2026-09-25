import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { type LunaMenuEntry } from './menu/menu-data';
import { LunaMenuTriggerDirective } from './menu/menu-trigger.directive';
import { LunaMenuComponent } from './menu/menu.component';
import { WindowComponent } from './window/window.component';

const fileItems: LunaMenuEntry[] = [
    { label: 'New' },
    { label: 'Open...' },
    { label: 'Save' },
    { separator: true },
    { label: 'Exit' },
];

const editItems: LunaMenuEntry[] = [
    { disabled: true, label: 'Undo' },
    { separator: true },
    { label: 'Paste' },
];

type ShellStoryArgs = {
    close: () => void;
    itemSelect: (item: { label: string } | null) => void;
    maximize: () => void;
    restore: () => void;
    title: string;
};

/**
 * Renders a window with a menu bar, the same shell the old gallery used.
 */
const meta: Meta<ShellStoryArgs> = {
    args: {
        close: fn(),
        itemSelect: fn(),
        maximize: fn(),
        restore: fn(),
        title: 'ng-luna',
    },
    component: WindowComponent,
    decorators: [
        moduleMetadata({
            imports: [
                LunaMenuComponent,
                LunaMenuTriggerDirective,
                MenuBarComponent,
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
            <luna-window
                [showClose]="true"
                [showHelp]="false"
                [showMinimize]="false"
                [title]="title"
                (close)="close()"
                (maximize)="maximize()"
                (restore)="restore()">
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
                <p style="width: 420px">Menus open from the bar. Title-bar buttons log Actions.</p>
            </luna-window>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Shell',
};

export default meta;

type Story = StoryObj<ShellStoryArgs>;

/**
 * Window and menu bar composed together.
 */
export const Desktop: Story = {};
