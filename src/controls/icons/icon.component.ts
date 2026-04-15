import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Named pixel sizes supported by `IconComponent`.
 */
export type IconSize = '12' | '16' | '20' | '24' | '32' | '48';

/**
 * Renders a trusted SVG string inside a span sized by `size`.
 */
@Component(
{
    selector: 'luna-icon',
    standalone: true,
    styleUrl: './icon.component.scss',
    templateUrl: './icon.component.html'
})
export class IconComponent
{
    /**
     * Pixel size token applied to the icon wrapper.
     */
    @Input()
    public size: IconSize = '24';

    /**
     * Raw SVG markup; sanitized once per assignment for `innerHTML` binding.
     */
    @Input({ required: true })
    public set svg(value: string)
    {
        // Bypass Angular stripping while the caller supplies known-safe SVG.
        this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(value);
    }

    /**
     * Sanitized HTML passed to the template `innerHTML` binding.
     */
    public sanitizedSvg: SafeHtml = '';

    /**
     * @param sanitizer - Sanitizes and marks SVG as trusted for the template.
     */
    public constructor(private sanitizer: DomSanitizer)
    {
    }
}
