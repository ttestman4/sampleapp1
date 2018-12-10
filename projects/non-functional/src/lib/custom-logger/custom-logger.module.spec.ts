import { CustomLoggerModule } from './custom-logger.module';

describe('CustomLoggerModule', () => {
    let customLoggerModuleForRoot: CustomLoggerModule;
    let customLoggerModuleForChild: CustomLoggerModule;


    it('should create an instance For Root', () => {
        customLoggerModuleForRoot = CustomLoggerModule.forRoot(undefined);
        expect(customLoggerModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        customLoggerModuleForChild = CustomLoggerModule.forChild();
        expect(customLoggerModuleForChild).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new CustomLoggerModule(customLoggerModuleForRoot)).toThrowError();
    });

    it('single instance creation is allowed', () => {
        const customLoggerModule = new CustomLoggerModule();
        expect(customLoggerModule).toBeTruthy();
    });
});
