import { CommonModule } from '@angular/common';
import { ErrorHandler, InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CustomLoggerConfig, CustomLoggerLevel, CustomLoggerModule, CUSTOM_LOGGER_CONFIG } from '../custom-logger/custom-logger.module';
import { AppErrorHandlerConfig } from './app-error-handler.models';
import { AppErrorHandlerService, RestAppErrorHandlerServiceId } from './app-error-handler.service';
export { AppErrorHandlerConfig } from './app-error-handler.models';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config object,
 * provided from the outside
 */
export const APP_ERROR_HANDLER_CONFIG =
  new InjectionToken<AppErrorHandlerConfig>('APP_ERROR_HANDLER_CONFIG');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomLoggerModule
  ],
  providers: [
    {
      provide: CUSTOM_LOGGER_CONFIG,
      useFactory: createLoggerConfig,
      deps: [APP_ERROR_HANDLER_CONFIG]
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandlerService
    },
  ],
})
export class AppErrorHandlerModule {
  constructor(@Optional() @SkipSelf() parentModule: AppErrorHandlerModule) {
    if (parentModule) {
      throw new Error(
        'AppErrorHandlerModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(config?: AppErrorHandlerConfig): ModuleWithProviders {
    return {
      ngModule: AppErrorHandlerModule,
      providers: [
        {
          provide: APP_ERROR_HANDLER_CONFIG,
          useValue: config ? config : {}
        },
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: AppErrorHandlerModule,
      providers: [
      ]
    };
  }
  static forTestReset() {
    RestAppErrorHandlerServiceId();
  }
}

export function createLoggerConfig(
  config: CustomLoggerConfig = { level: CustomLoggerLevel.ERROR }
) {
  const defaultConfig: CustomLoggerConfig = {
    level: CustomLoggerLevel.ERROR
  };
  return {
    ...defaultConfig,
    config
  };
}
