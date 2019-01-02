import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AppErrorHandlerModule, APP_ERROR_HANDLER_CONFIG } from './app-error-handler/app-error-handler.module';
import { AsyncActionStateManagerModule } from './async-action-state-manager/async-action-state-manager.module';
import { CustomLoggerModule, CUSTOM_LOGGER_CONFIG } from './custom-logger/custom-logger.module';
import { CustomPipeModule } from './custom-pipe/custom-pipe.module';
import { HttpConfigurationModule, HTTP_ERROR_CONFIG } from './http-configuration/http-configuration.module';
import { NonFunctionalConfig } from './non-functional.models';
import { RootStoreModule, ROOT_STORE_CONFIG } from './root-store/root-store.module';
export * from './async-action-state-manager/async-action-state-manager.module';
export { CustomLogger, CustomLoggerLevel } from './custom-logger/custom-logger.module';
export { NonFunctionalConfig } from './non-functional.models';


/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config object,
 * provided from the outside
 */
export const NON_FUNCTIONAL_CONFIG =
  new InjectionToken<NonFunctionalConfig>('NON_FUNCTIONAL_CONFIG');

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
      useExisting: NON_FUNCTIONAL_CONFIG
    },
    {
      provide: APP_ERROR_HANDLER_CONFIG,
      useExisting: NON_FUNCTIONAL_CONFIG
    },
    {
      provide: HTTP_ERROR_CONFIG,
      useExisting: NON_FUNCTIONAL_CONFIG
    },
    {
      provide: ROOT_STORE_CONFIG,
      useExisting: NON_FUNCTIONAL_CONFIG
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

  static forRoot(config?: NonFunctionalConfig): ModuleWithProviders {
    return {
      ngModule: NonFunctionalModule,
      providers: [
        {
          provide: NON_FUNCTIONAL_CONFIG,
          useValue: config ? config : {}
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
