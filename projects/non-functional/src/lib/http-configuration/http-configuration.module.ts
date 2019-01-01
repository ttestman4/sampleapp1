import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CUSTOM_LOGGER_CONFIG, CustomLoggerModule } from '../custom-logger/custom-logger.module';
import { HttpConfigurationConfigService } from './http-configuration-config.service';
import { HttpConfigurationConfig } from './http-configuration.models';
import { HttpErrorLoggerService, ResetHttpErrorLoggerServiceId } from './http-error-logger.service';
export { HttpConfigurationConfigService } from './http-configuration-config.service';
export { HttpConfigurationConfig } from './http-configuration.models';
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
      useExisting: HttpConfigurationConfigService
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
  static forRoot(config: HttpConfigurationConfig | null | undefined): ModuleWithProviders {
    return {
      ngModule: HttpConfigurationModule,
      providers: [
        {
          provide: HttpConfigurationConfigService,
          useValue: config
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
