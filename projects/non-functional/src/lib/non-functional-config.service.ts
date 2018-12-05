import { InjectionToken } from '@angular/core';
import { NonFunctionalConfig } from './non-functional.models';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config object,
 * provided from the outside
 */
export const NonFunctionalConfigService =
    new InjectionToken<NonFunctionalConfig>('NonFunctionalConfig');
