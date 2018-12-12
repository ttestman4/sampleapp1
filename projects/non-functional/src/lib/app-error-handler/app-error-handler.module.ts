import { CommonModule } from '@angular/common';
import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CustomLoggerConfigService, CustomLoggerModule } from '../custom-logger/custom-logger.module';
import { AppErrorHandlerConfigService } from './app-error-handler-config.service';
import { AppErrorHandlerConfig } from './app-error-handler.models';
import { AppErrorHandlerService, RestAppErrorHandlerServiceId } from './app-error-handler.service';
export { AppErrorHandlerConfigService } from './app-error-handler-config.service';
export { AppErrorHandlerConfig } from './app-error-handler.models';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomLoggerModule
  ],
  providers: [
    {
      provide: CustomLoggerConfigService,
      useExisting: AppErrorHandlerConfigService
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
  static forRoot(config: AppErrorHandlerConfig | null | undefined): ModuleWithProviders {
    return {
      ngModule: AppErrorHandlerModule,
      providers: [
        {
          provide: AppErrorHandlerConfigService,
          useValue: config
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
