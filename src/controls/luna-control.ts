import { Directive, Input } from '@angular/core';

/**
 * Base directive supplying shared form-related inputs for Luna controls.
 */
@Directive()
export abstract class LunaControl
{
    /** Binds the host element `autofocus` when true. */
    @Input()
    public autofocus = false;

    /** Disables the control when true. */
    @Input()
    public disabled = false;

    /** Sets the host element `id` when bound. */
    @Input()
    public id?: string;

    /** Sets the host element `name` when bound. */
    @Input()
    public name?: string;

    /** Sets the host `tabindex` when bound. */
    @Input()
    public tabindex?: number;
}
