import { AppErrorHandlerConfig } from './app-error-handler/app-error-handler.module';
import { CustomLoggerConfig } from './custom-logger/custom-logger.module';
export interface NonFunctionalConfig extends CustomLoggerConfig, AppErrorHandlerConfig {
}
