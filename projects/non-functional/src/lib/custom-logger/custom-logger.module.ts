import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoggerConfig, LoggerModule } from 'ngx-logger';
import * as LoggerModels from './custom-logger.model';

export * from './custom-logger.model';
/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config object,
 * provided from the outside
 */
export const CUSTOM_LOGGER_CONFIG =
  new InjectionToken<LoggerModels.CustomLoggerConfig>('CUSTOM_LOGGER_CONFIG');


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggerModule
  ],
  providers: [
    {
      provide: LoggerConfig,
      useFactory: createLoggerConfig,
      deps: [CUSTOM_LOGGER_CONFIG]
    }
  ]
})
export class CustomLoggerModule {
  constructor(@Optional() @SkipSelf() parentModule: CustomLoggerModule) {
    if (parentModule) {
      throw new Error(
        'CustomLoggerModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(config?: LoggerModels.CustomLoggerConfig): ModuleWithProviders {
    return {
      ngModule: CustomLoggerModule,
      providers: [
        {
          provide: CUSTOM_LOGGER_CONFIG,
          useValue: config ? config : {}
        }
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: CustomLoggerModule,
      providers: [
      ]
    };
  }
}

export function createLoggerConfig(
  config: LoggerModels.CustomLoggerConfig = { level: LoggerModels.CustomLoggerLevel.ERROR }
) {
  const defaultConfig: LoggerConfig = {
    level: LoggerModels.CustomLoggerLevel.ERROR
  };
  return {
    ...defaultConfig,
    config
  };
}
