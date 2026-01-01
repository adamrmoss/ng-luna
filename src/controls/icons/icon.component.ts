import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type IconSize = '12' | '16' | '20' | '24' | '32' | '48';

@Component(
{
    selector: 'luna-icon',
    standalone: true,
    styleUrl: './icon.component.scss',
    template: `<span [innerHTML]="sanitizedSvg"></span>`
})
export class IconComponent
{
    @Input()
    public size: IconSize = '24';

    @Input({ required: true })
    public set svg(value: string)
    {
        this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(value);
    }

    public sanitizedSvg: SafeHtml = '';

    constructor(private sanitizer: DomSanitizer) {}
}

