import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AppErrorHandlerConfigService, AppErrorHandlerModule } from './app-error-handler/app-error-handler.module';
import { CustomLoggerConfigService, CustomLoggerModule } from './custom-logger/custom-logger.module';
import { HttpConfigurationConfigService, HttpConfigurationModule } from './http-configuration/http-configuration.module';
import { NonFunctionalConfigService } from './non-functional-config.service';
import { NonFunctionalComponent } from './non-functional.component';
import { NonFunctionalConfig } from './non-functional.models';
export { CustomLogger, CustomLoggerLevel } from './custom-logger/custom-logger.module';
export { NonFunctionalConfig } from './non-functional.models';

@NgModule({
  declarations: [NonFunctionalComponent],
  imports: [
    CustomLoggerModule,
    AppErrorHandlerModule,
    HttpConfigurationModule
  ],
  providers: [
    {
      provide: CustomLoggerConfigService,
      useExisting: NonFunctionalConfigService
    },
    {
      provide: AppErrorHandlerConfigService,
      useExisting: NonFunctionalConfigService
    },
    {
      provide: HttpConfigurationConfigService,
      useExisting: NonFunctionalConfigService
    }
  ],
  exports: [NonFunctionalComponent]
})
export class NonFunctionalModule {
  constructor(@Optional() @SkipSelf() parentModule: NonFunctionalModule) {
    if (parentModule) {
      throw new Error(
        'NonFunctionalModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: NonFunctionalConfig | null | undefined): ModuleWithProviders {
    return {
      ngModule: NonFunctionalModule,
      providers: [
        {
          provide: NonFunctionalConfigService,
          useValue: config
        },
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: NonFunctionalModule,
      providers: [
      ]
    };
  }
  static forTestReset() {
    AppErrorHandlerModule.forTestReset();
    HttpConfigurationModule.forTestReset();
  }
}
