import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { APP_ERROR_HANDLER_CONFIG, AppErrorHandlerModule } from './app-error-handler/app-error-handler.module';
import { CUSTOM_LOGGER_CONFIG, CustomLoggerModule } from './custom-logger/custom-logger.module';
import { HTTP_ERROR_CONFIG, HttpConfigurationModule } from './http-configuration/http-configuration.module';
import { NonFunctionalConfigService } from './non-functional-config.service';
import { NonFunctionalConfig } from './non-functional.models';
import { RootStoreModule , ROOT_STORE_CONFIG} from './root-store/root-store.module';
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
      provide: CUSTOM_LOGGER_CONFIG,
      useExisting: NonFunctionalConfigService
    },
    {
      provide: APP_ERROR_HANDLER_CONFIG,
      useExisting: NonFunctionalConfigService
    },
    {
      provide: HTTP_ERROR_CONFIG,
      useExisting: NonFunctionalConfigService
    },
    {
      provide: ROOT_STORE_CONFIG,
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
