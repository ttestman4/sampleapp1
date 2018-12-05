import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLoggerConfig } from './custom-logger.model';
import { CustomLoggerConfigService } from './custom-logger-config.service';
import { LoggerConfig, LoggerModule } from 'ngx-logger';

export {
  NgxLoggerLevel as CustomLoggerLevel,
  NGXLogger as CustomLogger
} from 'ngx-logger';
export { CustomLoggerConfig } from './custom-logger.model';
export { CustomLoggerConfigService } from './custom-logger-config.service';

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
