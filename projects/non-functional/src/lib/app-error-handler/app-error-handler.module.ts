import { ErrorHandler, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppErrorHandlerService } from './app-error-handler.service';
import { AppErrorHandlerConfigService } from './app-error-handler-config.service';
import { CustomLoggerModule, CustomLoggerConfigService } from '../custom-logger/custom-logger.module';

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
  static forRoot(config: AppErrorHandlerService | null | undefined): ModuleWithProviders {
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
}
