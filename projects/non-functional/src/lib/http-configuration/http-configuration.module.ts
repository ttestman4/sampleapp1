import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CustomLoggerConfig, CustomLoggerLevel, CustomLoggerModule, CUSTOM_LOGGER_CONFIG } from '../custom-logger/custom-logger.module';
import { HttpConfigurationConfig } from './http-configuration.models';
import { HttpErrorLoggerService, ResetHttpErrorLoggerServiceId } from './http-error-logger.service';
export { HttpConfigurationConfig } from './http-configuration.models';


/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config object,
 * provided from the outside
 */
export const HTTP_ERROR_CONFIG =
  new InjectionToken<HttpConfigurationConfig>('HTTP_ERROR_CONFIG');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomLoggerModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: CUSTOM_LOGGER_CONFIG,
      useFactory: createLoggerConfig,
      deps: [HTTP_ERROR_CONFIG]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorLoggerService,
      multi: true
    }
  ],
})
export class HttpConfigurationModule {
  constructor(@Optional() @SkipSelf() parentModule: HttpConfigurationModule) {
    if (parentModule) {
      throw new Error(
        'HttpConfigurationModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(config?: HttpConfigurationConfig): ModuleWithProviders {
    return {
      ngModule: HttpConfigurationModule,
      providers: [
        {
          provide: HTTP_ERROR_CONFIG,
          useValue: config ? config : {}
        }
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: HttpConfigurationModule,
      providers: [
      ]
    };
  }
  static forTestReset() {
    ResetHttpErrorLoggerServiceId();
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
