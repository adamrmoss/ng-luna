import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

type TabsStoryArgs = {
    activeTabId: string;
    isMaximized: boolean;
    tabChange: (id: string) => void;
};

/**
 * Renders two tabs and reports the active id.
 */
const meta: Meta<TabsStoryArgs> = {
    args: {
        activeTabId: 'one',
        isMaximized: false,
        tabChange: fn(),
    },
    component: TabsComponent,
    decorators: [
        moduleMetadata({
            imports: [
                TabComponent,
            ],
        }),
    ],
    render: (args) => ({
        props: args,
        template: `
            <luna-tabs ${argsToTemplate(args)}>
                <luna-tab
                    id="one"
                    label="First">
                    <p>First panel</p>
                </luna-tab>
                <luna-tab
                    id="two"
                    label="Second">
                    <p>Second panel</p>
                </luna-tab>
            </luna-tabs>
        `,
    }),
    tags: ['autodocs'],
    title: 'Controls/Tabs',
};

export default meta;

type Story = StoryObj<TabsStoryArgs>;

/**
 * Two panels. `activeTabId` selects which one is visible.
 */
export const Default: Story = {};
