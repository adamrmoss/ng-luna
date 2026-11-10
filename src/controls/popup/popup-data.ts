import { InjectionToken } from '@angular/core';

/**
 * Injection token for the payload passed into `LunaPopupService.open`.
 */
export const POPUP_DATA = new InjectionToken<unknown>('POPUP_DATA');
