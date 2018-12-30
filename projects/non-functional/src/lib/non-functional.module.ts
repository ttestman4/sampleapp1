import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AppErrorHandlerConfigService, AppErrorHandlerModule } from './app-error-handler/app-error-handler.module';
import { CustomLoggerConfigService, CustomLoggerModule } from './custom-logger/custom-logger.module';
import { HttpConfigurationConfigService, HttpConfigurationModule } from './http-configuration/http-configuration.module';
import { NonFunctionalConfigService } from './non-functional-config.service';
import { NonFunctionalConfig } from './non-functional.models';
import { RootStoreModule } from './root-store/root-store.module';
import { RootStoreConfigService } from './root-store/root-store-config.service';
import { CustomPipeModule } from './custom-pipe/custom-pipe.module';
import { AsyncActionStateManagerModule } from './async-action-state-manager/async-action-state-manager.module';
export { CustomLogger, CustomLoggerLevel } from './custom-logger/custom-logger.module';
export { NonFunctionalConfig } from './non-functional.models';
export * from './async-action-state-manager/async-action-state-manager.module';
@NgModule({
  declarations: [],
  imports: [
    CustomLoggerModule,
    AppErrorHandlerModule,
    HttpConfigurationModule,
    RootStoreModule,
    CustomPipeModule,
    AsyncActionStateManagerModule,
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
    },
    {
      provide: RootStoreConfigService,
      useExisting: NonFunctionalConfigService
    }
  ],
  exports: [
    CustomPipeModule,
    AsyncActionStateManagerModule,
  ]
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
    AsyncActionStateManagerModule.forTestReset();
  }
}
