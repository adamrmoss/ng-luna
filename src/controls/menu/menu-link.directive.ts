import { Directive, Input } from '@angular/core';

/**
 * Menubar chrome for a link that does not open a menu.
 * The overlay stylesheet paints `a[lunaMenuLink]` with the trigger rules.
 */
@Directive({
    selector: 'a[lunaMenuLink]',
    standalone: true,
})
export class LunaMenuLinkDirective
{
    /**
     * Optional binding for symmetry with the attribute selector. The value is unused.
     */
    @Input()
    public lunaMenuLink: unknown = '';
}
