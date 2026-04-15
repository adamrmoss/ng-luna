import { InjectionToken } from '@angular/core';

/**
 * Discriminates message box variants rendered by `MessageBoxComponent`.
 */
export type MessageBoxType = 'alert' | 'confirm' | 'prompt';

/**
 * Structured result for prompt flows including optional text field value.
 */
export interface MessageBoxReturnData
{
    /** Which footer action dismissed the dialog. */
    button: 'cancel' | 'ok';

    /** Current prompt field text when `button` is `ok`. */
    promptValue?: string;
}

/**
 * Labels, default values, and custom result payloads for message box buttons.
 */
export interface MessageBoxOptions<T = boolean>
{
    /** Label for the non-primary action. */
    cancelLabel?: string;

    /** Value emitted when the user cancels (confirm/prompt). */
    cancelValue?: T;

    /** Label for the primary action. */
    okLabel?: string;

    /** Value emitted on OK for confirm; optional for alert. */
    okValue?: T;

    /** Initial text for the prompt field. */
    promptDefaultValue?: string;

    /** Placeholder shown in the prompt field. */
    promptPlaceholder?: string;

    /** Dialog title when not using the legacy `title` field on `MessageBoxData`. */
    title?: string;
}

/**
 * Payload injected into `MessageBoxComponent` for a single modal instance.
 */
export interface MessageBoxData<T = boolean>
{
    /** Body copy shown in the dialog. */
    message: string;

    /** Optional button labels, defaults, and return values. */
    options?: MessageBoxOptions<T>;

    /** Legacy title when `options.title` is not set. */
    title?: string;

    /** Which template variant to render. */
    type: MessageBoxType;
}

/**
 * Injection token carrying `MessageBoxData` for the active message box instance.
 */
export const MESSAGE_BOX_DATA = new InjectionToken<MessageBoxData<unknown>>('MESSAGE_BOX_DATA');
