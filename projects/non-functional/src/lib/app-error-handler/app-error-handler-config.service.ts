import { InjectionToken } from '@angular/core';
import { AppErrorHandlerConfig } from './app-error-handler.models';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config object,
 * provided from the outside
 */
export const AppErrorHandlerConfigService =
    new InjectionToken<AppErrorHandlerConfig>('AppErrorHandlerConfig');
