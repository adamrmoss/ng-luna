import { InjectionToken } from '@angular/core';

export type MessageBoxType = 'alert' | 'confirm';

export interface MessageBoxOptions<T = boolean>
{
    cancelLabel?: string;
    cancelValue?: T;
    okLabel?: string;
    okValue?: T;
    title?: string;
}

export interface MessageBoxData<T = boolean>
{
    message: string;
    options?: MessageBoxOptions<T>;
    title?: string;
    type: MessageBoxType;
}

export const MESSAGE_BOX_DATA = new InjectionToken<MessageBoxData<unknown>>('MESSAGE_BOX_DATA');
