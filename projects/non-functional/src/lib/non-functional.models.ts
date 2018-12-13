import { AppErrorHandlerConfig } from './app-error-handler/app-error-handler.module';
import { CustomLoggerConfig } from './custom-logger/custom-logger.module';
import { HttpConfigurationConfig } from './http-configuration/http-configuration.module';
import { RootStoreConfig } from './root-store/root-store.module';
export interface NonFunctionalConfig
    extends CustomLoggerConfig,
    AppErrorHandlerConfig,
    HttpConfigurationConfig,
    RootStoreConfig {
}
