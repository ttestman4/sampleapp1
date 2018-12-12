import { HttpConfigurationModule } from './http-configuration.module';

describe('HttpConfigurationModule', () => {
    let httpConfigurationModuleForRoot: HttpConfigurationModule;
    let httpConfigurationModuleForChild: HttpConfigurationModule;


    it('should create an instance For Root', () => {
        httpConfigurationModuleForRoot = HttpConfigurationModule.forRoot(undefined);
        expect(httpConfigurationModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        httpConfigurationModuleForChild = HttpConfigurationModule.forChild();
        expect(httpConfigurationModuleForChild).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new HttpConfigurationModule(httpConfigurationModuleForRoot)).toThrowError();
    });

    it('single instance creation is allowed', () => {
        const httpConfigurationModule = new HttpConfigurationModule();
        expect(httpConfigurationModule).toBeTruthy();
    });
});
