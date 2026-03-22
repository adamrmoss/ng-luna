import { Component, Input, Output, EventEmitter, QueryList, ViewChildren, ContentChildren, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule, FocusKeyManager, FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';
import { TabComponent } from './tab.component';

/**
 * Bridges a tab button `ElementRef` to CDK `FocusableOption` for roving tabindex.
 */
class TabButtonFocusable implements FocusableOption
{
    public constructor(private elementRef: ElementRef<HTMLButtonElement>)
    {
    }

    /**
     * Focuses the underlying button, optionally recording the focus origin.
     *
     * @param origin - Optional CDK focus origin metadata.
     */
    public focus(origin?: FocusOrigin): void
    {
        this.elementRef.nativeElement.focus();
    }
}

/**
 * Tab list and panel host with keyboard navigation and `activeTabId` binding.
 */
@Component({
    selector: 'luna-tabs',
    standalone: true,
    imports: [ CommonModule, A11yModule ],
    templateUrl: './tabs.component.html',
    styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent
    extends LunaControl implements AfterViewInit, AfterContentInit
{
    /** Id of the tab panel currently shown; defaults to the first tab when unset. */
    @Input()
    public activeTabId?: string;

    /** Emits whenever the active tab id changes from click or keyboard. */
    @Output()
    public tabChange = new EventEmitter<string>();

    /** Tab definitions projected as `luna-tab` children. */
    @ContentChildren(TabComponent)
    public tabs!: QueryList<TabComponent>;

    /** Tab header buttons aligned by index with `tabs`. */
    @ViewChildren('tabButton')
    public tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

    private keyManager?: FocusKeyManager<TabButtonFocusable>;

    /**
     * @param platform - CDK platform detection for optional behavior.
     */
    public constructor(
        public platform: Platform
    )
    {
        super();
    }

    /**
     * Reports whether a tab id is currently selected.
     *
     * @param tabId - Tab id to compare with `activeTabId`.
     * @returns True when the ids match.
     */
    public isActive(tabId: string): boolean
    {
        return this.activeTabId === tabId;
    }

    /**
     * Seeds the initial selection when none is provided and syncs panel visibility.
     */
    public ngAfterContentInit(): void
    {
        // Default to the first tab so the group always has a visible panel.
        if (!this.activeTabId && this.tabs.length > 0)
        {
            this.activeTabId = this.tabs.first.id;
        }

        // Align each tab's `active` flag with the current model.
        this.updateActiveTab();
    }

    /**
     * Builds the focus key manager once button elements exist and syncs the active item.
     */
    public ngAfterViewInit(): void
    {
        // Wrap each projected button so arrow keys can move roving focus.
        const focusableItems = this.tabButtons.map(ref => new TabButtonFocusable(ref));
        this.keyManager = new FocusKeyManager(focusableItems)
            .withHorizontalOrientation('ltr')
            .withWrap();

        // Match keyboard focus state to the bound active tab when possible.
        if (this.activeTabId)
        {
            const tabsArray = this.tabs.toArray();
            const activeIndex = tabsArray.findIndex(tab => tab.id === this.activeTabId);

            if (activeIndex >= 0)
            {
                this.keyManager.setActiveItem(activeIndex);
            }
        }
    }

    /**
     * Delegates horizontal arrows to the key manager and selects the focused tab.
     *
     * @param event - Native keydown from the tab list region.
     */
    public onKeyDown(event: KeyboardEvent): void
    {
        if (this.keyManager)
        {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
            {
                // Advance roving tabindex among header buttons.
                this.keyManager.onKeydown(event);

                const activeIndex = this.keyManager.activeItemIndex;
                const tabsArray = this.tabs.toArray();

                if (activeIndex !== null && activeIndex >= 0 && activeIndex < tabsArray.length)
                {
                    // Keep selection and panel content aligned with the focused button.
                    this.selectTab(tabsArray[activeIndex].id);
                }
            }
        }
    }

    /**
     * Activates a tab by id, updates panels, emits `tabChange`, and syncs the key manager.
     *
     * @param tabId - Id of the tab to show.
     */
    public selectTab(tabId: string): void
    {
        this.activeTabId = tabId;

        this.updateActiveTab();
        this.tabChange.emit(tabId);

        const tabsArray = this.tabs.toArray();
        const activeIndex = tabsArray.findIndex(tab => tab.id === tabId);

        if (activeIndex >= 0 && this.keyManager)
        {
            this.keyManager.setActiveItem(activeIndex);
        }
    }

    /**
     * Sets each child tab's `active` flag from `activeTabId`.
     */
    private updateActiveTab(): void
    {
        this.tabs.forEach(tab =>
        {
            tab.active = tab.id === this.activeTabId;
        });
    }
}
