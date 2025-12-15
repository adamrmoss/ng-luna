import { Component, Input, Output, EventEmitter, QueryList, ViewChildren, ContentChildren, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule, FocusKeyManager, FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';
import { TabComponent } from './tab.component';

class TabButtonFocusable implements FocusableOption
{
    constructor(private elementRef: ElementRef<HTMLButtonElement>)
    {
    }

    public focus(origin?: FocusOrigin): void
    {
        this.elementRef.nativeElement.focus();
    }
}

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
    @Input()
    public activeTabId?: string;

    @Output()
    public tabChange = new EventEmitter<string>();

    @ContentChildren(TabComponent)
    public tabs!: QueryList<TabComponent>;

    @ViewChildren('tabButton')
    public tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

    private keyManager?: FocusKeyManager<TabButtonFocusable>;

    constructor(
        public platform: Platform
    )
    {
        super();
    }

    public ngAfterContentInit(): void
    {
        if (!this.activeTabId && this.tabs.length > 0)
        {
            this.activeTabId = this.tabs.first.id;
        }

        this.updateActiveTab();
    }

    public ngAfterViewInit(): void
    {
        const focusableItems = this.tabButtons.map(ref => new TabButtonFocusable(ref));
        this.keyManager = new FocusKeyManager(focusableItems)
            .withHorizontalOrientation('ltr')
            .withWrap();

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

    public isActive(tabId: string): boolean
    {
        return this.activeTabId === tabId;
    }

    private updateActiveTab(): void
    {
        this.tabs.forEach(tab =>
        {
            tab.active = tab.id === this.activeTabId;
        });
    }

    public onKeyDown(event: KeyboardEvent): void
    {
        if (this.keyManager)
        {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
            {
                this.keyManager.onKeydown(event);
                const activeIndex = this.keyManager.activeItemIndex;
                const tabsArray = this.tabs.toArray();
                if (activeIndex !== null && activeIndex >= 0 && activeIndex < tabsArray.length)
                {
                    this.selectTab(tabsArray[activeIndex].id);
                }
            }
        }
    }
}
