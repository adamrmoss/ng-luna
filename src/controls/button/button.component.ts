import { Component, Input, Output, EventEmitter, ElementRef, OnDestroy, AfterViewInit, Optional } from '@angular/core';
import { BidiModule, Dir } from '@angular/cdk/bidi';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';

import { LunaControl } from '../luna-control';

/**
 * Allowed values for the host button `type` attribute.
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Allowed values for the host `formenctype` attribute.
 */
export type FormEnctype = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

/**
 * Allowed values for the host `formmethod` attribute.
 */
export type FormMethod = 'get' | 'post';

/**
 * Allowed values for the host `formtarget` attribute.
 */
export type FormTarget = '_self' | '_blank' | '_parent' | '_top';

/**
 * Allowed values for the host `popovertargetaction` attribute.
 */
export type PopoverTargetAction = 'show' | 'hide' | 'toggle';

/**
 * Native-like button that forwards form and popover attributes and honors `LunaControl` inputs.
 */
@Component({
    selector: 'luna-button',
    standalone: true,
    imports: [ BidiModule ],
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ]
})
export class ButtonComponent
    extends LunaControl implements AfterViewInit, OnDestroy
{
    /** Sets the host `command` attribute when bound. */
    @Input()
    public command?: string;

    /** Sets the host `commandfor` attribute when bound. */
    @Input()
    public commandfor?: string;

    /** Sets the host `form` attribute when bound. */
    @Input()
    public form?: string;

    /** Sets the host `formaction` attribute when bound. */
    @Input()
    public formaction?: string;

    /** Sets the host `formenctype` attribute when bound. */
    @Input()
    public formenctype?: FormEnctype;

    /** Sets the host `formmethod` attribute when bound. */
    @Input()
    public formmethod?: FormMethod;

    /** Sets the host `formnovalidate` attribute when true. */
    @Input()
    public formnovalidate = false;

    /** Sets the host `formtarget` attribute when bound. */
    @Input()
    public formtarget?: FormTarget;

    /** Sets the host `popovertarget` attribute when bound. */
    @Input()
    public popovertarget?: string;

    /** Sets the host `popovertargetaction` attribute when bound. */
    @Input()
    public popovertargetaction?: PopoverTargetAction;

    /** Sets the host `type` attribute. */
    @Input()
    public type: ButtonType = 'button';

    /** Sets the host `value` attribute when bound. */
    @Input()
    public value?: string;

    /** Emits when the host is clicked and not disabled. */
    @Output()
    public click = new EventEmitter<MouseEvent>();

    /**
     * @param elementRef - Host element reference for focus monitoring.
     * @param focusMonitor - CDK focus monitor for keyboard focus visuals.
     * @param platform - CDK platform detection for optional behavior.
     * @param dir - Optional text direction when `Dir` is provided by ancestors.
     */
    public constructor(
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor,
        public platform: Platform,
        @Optional() public dir: Dir
    )
    {
        super();
    }

    /**
     * Starts monitoring the host for focus state.
     */
    public ngAfterViewInit(): void
    {
        // Register the host so a11y focus classes stay in sync with keyboard use.
        this.focusMonitor.monitor(this.elementRef);
    }

    /**
     * Stops focus monitoring to avoid leaks when the view is destroyed.
     */
    public ngOnDestroy(): void
    {
        // Tear down CDK monitoring tied to this host element.
        this.focusMonitor.stopMonitoring(this.elementRef);
    }

    /**
     * Emits the click event when enabled; blocks default and propagation when disabled.
     *
     * @param event - Native click event from the host button.
     */
    public onClick(event: MouseEvent): void
    {
        // Swallow interaction when disabled so form actions do not run.
        if (this.disabled)
        {
            event.preventDefault();
            event.stopImmediatePropagation();

            return;
        }

        // Forward the native event to template subscribers.
        this.click.emit(event);
    }
}
