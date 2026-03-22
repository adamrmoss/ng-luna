import { InjectionToken } from '@angular/core';

/**
 * Injection token for arbitrary payload passed into generic `LunaModalService.open` dialogs.
 */
export const MODAL_DATA = new InjectionToken<unknown>('MODAL_DATA');
