import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { IconComponent, SaveSvg, TrashSvg } from '../icons';
import { ToolbarGroupComponent } from './toolbar-group.component';
import { ToolbarComponent } from './toolbar.component';

/**
 * Renders a toolbar. Each story pins one variant.
 */
const meta: Meta<ToolbarComponent> = {
    component: ToolbarComponent,
    decorators: [
        moduleMetadata({
            imports: [
                ButtonComponent,
                IconComponent,
                ToolbarGroupComponent,
            ],
        }),
    ],
    tags: ['autodocs'],
    title: 'Controls/Toolbar',
};

export default meta;

type Story = StoryObj<ToolbarComponent>;

/**
 * Icon buttons with a 4px gap and no bar fill.
 */
export const Cluster: Story = {
    render: () => ({
        props: {
            saveIcon: SaveSvg,
            trashIcon: TrashSvg,
        },
        template: `
            <luna-toolbar variant="cluster">
                <luna-button variant="icon" type="button">
                    <luna-icon size="16" [svg]="saveIcon"></luna-icon>
                </luna-button>
                <luna-button variant="icon" type="button">
                    <luna-icon size="16" [svg]="trashIcon"></luna-icon>
                </luna-button>
            </luna-toolbar>
        `,
    }),
};

/**
 * Editor bar. The first group is looser than the group that follows.
 */
export const Editor: Story = {
    render: () => ({
        props: {
            saveIcon: SaveSvg,
            trashIcon: TrashSvg,
        },
        template: `
            <luna-toolbar variant="editor">
                <luna-toolbar-group>
                    <luna-button variant="icon" type="button">
                        <luna-icon size="16" [svg]="saveIcon"></luna-icon>
                    </luna-button>
                    <luna-button variant="icon" type="button">
                        <luna-icon size="16" [svg]="trashIcon"></luna-icon>
                    </luna-button>
                </luna-toolbar-group>
                <luna-toolbar-group>
                    <luna-button variant="icon" size="compact" type="button">
                        <luna-icon size="16" [svg]="saveIcon"></luna-icon>
                    </luna-button>
                    <luna-button variant="icon" size="compact" tone="danger" type="button">
                        <luna-icon size="16" [svg]="trashIcon"></luna-icon>
                    </luna-button>
                </luna-toolbar-group>
            </luna-toolbar>
        `,
    }),
};

/**
 * Command bar for debug actions.
 */
export const Command: Story = {
    render: () => ({
        template: `
            <luna-toolbar variant="command">
                <luna-button variant="command" type="button">Start</luna-button>
                <luna-button variant="command" type="button" disabled>Stop</luna-button>
            </luna-toolbar>
        `,
    }),
};

/**
 * Trailing cluster with no gap.
 */
export const End: Story = {
    render: () => ({
        template: `
            <luna-toolbar variant="end">
                <luna-button type="button">Ok</luna-button>
            </luna-toolbar>
        `,
    }),
};

/**
 * Floating icon button pinned to the top-right of its box.
 */
export const Float: Story = {
    render: () => ({
        props: {
            trashIcon: TrashSvg,
        },
        template: `
            <div style="position: relative; height: 80px;">
                <luna-toolbar variant="float">
                    <luna-button variant="icon" size="compact" tone="danger" type="button">
                        <luna-icon size="16" [svg]="trashIcon"></luna-icon>
                    </luna-button>
                </luna-toolbar>
            </div>
        `,
    }),
};
