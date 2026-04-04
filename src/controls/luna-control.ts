import { Directive, HostBinding, Input } from '@angular/core';

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

    /** Expands the control to fill its containing block when true. */
    @Input()
    public isMaximized = false;

    /** Sets the host element `name` when bound. */
    @Input()
    public name?: string;

    /** Sets the host `tabindex` when bound. */
    @Input()
    public tabindex?: number;

    /** Applies `luna-maximized` to the host element when `isMaximized` is true. */
    @HostBinding('class.luna-maximized')
    public get isMaximizedClass(): boolean
    {
        return this.isMaximized;
    }
}
