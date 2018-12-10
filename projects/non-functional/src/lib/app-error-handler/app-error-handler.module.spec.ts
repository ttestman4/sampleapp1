import { AppErrorHandlerModule } from './app-error-handler.module';

describe('AppErrorHandlerModule', () => {
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

    it('duplicate instance creation not allowed', () => {
        expect(() => new AppErrorHandlerModule(appErrorHandlerModuleForRoot))
            .toThrowError();
    });

    it('single instance creation is allowed', () => {
        const appErrorModule = new AppErrorHandlerModule();
        expect(appErrorModule).toBeTruthy();
    });
});
