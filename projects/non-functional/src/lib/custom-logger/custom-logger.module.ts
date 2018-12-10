import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoggerConfig, LoggerModule } from 'ngx-logger';
import { CustomLoggerConfigService } from './custom-logger-config.service';
import { CustomLoggerConfig } from './custom-logger.model';

export { NGXLogger as CustomLogger, NgxLoggerLevel as CustomLoggerLevel } from 'ngx-logger';
export { CustomLoggerConfigService } from './custom-logger-config.service';
export { CustomLoggerConfig } from './custom-logger.model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggerModule
  ],
  providers: [
    {
      provide: LoggerConfig,
      useExisting: CustomLoggerConfigService
    }
  ]
})
export class CustomLoggerModule {
  constructor(@Optional() @SkipSelf() parentModule: CustomLoggerModule) {
    if (parentModule) {
      throw new Error(
        'CustomLoggerModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(config: CustomLoggerConfig | null | undefined): ModuleWithProviders {
    return {
      ngModule: CustomLoggerModule,
      providers: [
        {
          provide: CustomLoggerConfigService,
          useValue: config
        }
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: CustomLoggerModule,
      providers: [
      ]
    };
  }
}
