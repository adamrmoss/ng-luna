import { Component, Input, Output, EventEmitter, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule, FocusKeyManager, FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';

export interface Tab
{
    id: string;
    label: string;
    content?: string;
}

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
    extends LunaControl implements AfterViewInit
{
    @Input()
    public activeTabId?: string;

    @Input()
    public tabs: Tab[] = [];

    @Output()
    public tabChange = new EventEmitter<string>();

    @ViewChildren('tabButton')
    public tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

    private keyManager?: FocusKeyManager<TabButtonFocusable>;

    constructor(
        public platform: Platform
    )
    {
        super();
    }

    public ngAfterViewInit(): void
    {
        const focusableItems = this.tabButtons.map(ref => new TabButtonFocusable(ref));
        this.keyManager = new FocusKeyManager(focusableItems)
            .withHorizontalOrientation('ltr')
            .withWrap();

        if (this.activeTabId)
        {
            const activeIndex = this.tabs.findIndex(tab => tab.id === this.activeTabId);
            if (activeIndex >= 0)
            {
                this.keyManager.setActiveItem(activeIndex);
            }
        }
    }

    public selectTab(tabId: string): void
    {
        this.activeTabId = tabId;
        this.tabChange.emit(tabId);

        const activeIndex = this.tabs.findIndex(tab => tab.id === tabId);
        if (activeIndex >= 0 && this.keyManager)
        {
            this.keyManager.setActiveItem(activeIndex);
        }
    }

    public isActive(tabId: string): boolean
    {
        return this.activeTabId === tabId;
    }

    public onKeyDown(event: KeyboardEvent): void
    {
        if (this.keyManager)
        {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
            {
                this.keyManager.onKeydown(event);
                const activeIndex = this.keyManager.activeItemIndex;
                if (activeIndex !== null && activeIndex >= 0 && activeIndex < this.tabs.length)
                {
                    this.selectTab(this.tabs[activeIndex].id);
                }
            }
        }
    }
}
