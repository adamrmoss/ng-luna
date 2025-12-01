import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tab
{
    id: string;
    label: string;
    content?: string;
}

@Component({
    selector: 'luna-tabs',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './tabs.component.html',
    styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent
{
    @Input()
    public tabs: Tab[] = [];

    @Input()
    public activeTabId?: string;

    @Output()
    public tabChange = new EventEmitter<string>();

    public selectTab(tabId: string): void
    {
        this.activeTabId = tabId;
        this.tabChange.emit(tabId);
    }

    public isActive(tabId: string): boolean
    {
        return this.activeTabId === tabId;
    }
}
