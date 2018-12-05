import { InjectionToken } from '@angular/core';
import { CustomLoggerConfig } from './custom-logger.model';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config object,
 * provided from the outside
 */
export const CustomLoggerConfigService =
    new InjectionToken<CustomLoggerConfig>('CustomLoggerConfig');
