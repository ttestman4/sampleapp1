import { ModuleWithProviders, NgModule } from '@angular/core';
import { NonFunctionalComponent } from './non-functional.component';
import { CustomLoggerModule, CustomLoggerConfigService } from './custom-logger/custom-logger.module';
import { NonFunctionalConfig } from './non-functional.models';
import { NonFunctionalConfigService } from './non-functional-config.service';
import { AppErrorHandlerModule } from './app-error-handler/app-error-handler.module';
export { CustomLoggerLevel, CustomLogger } from './custom-logger/custom-logger.module';
export { NonFunctionalConfig } from './non-functional.models';

@NgModule({
  declarations: [NonFunctionalComponent],
  imports: [
    CustomLoggerModule,
    AppErrorHandlerModule
  ],
  providers: [
    {
      provide: CustomLoggerConfigService,
      useExisting: NonFunctionalConfigService
    }
  ],
  exports: [NonFunctionalComponent]
})
export class NonFunctionalModule {
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
    return CustomLoggerModule.forChild();
  }
}
