import { AppErrorHandlerModule } from './app-error-handler.module';

describe('CustomLoggerModule', () => {
    let appErrorHandlerModuleForRoot: AppErrorHandlerModule;
    let appErrorHandlerModuleForChild: AppErrorHandlerModule;


    it('should create an instance For Root', () => {
        appErrorHandlerModuleForRoot = AppErrorHandlerModule.forRoot(undefined);
        expect(appErrorHandlerModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        appErrorHandlerModuleForChild = AppErrorHandlerModule.forChild();
        expect(appErrorHandlerModuleForChild).toBeTruthy();
    });
});
