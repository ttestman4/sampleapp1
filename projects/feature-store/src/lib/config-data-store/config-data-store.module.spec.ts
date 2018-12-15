import {
    ConfigDataStoreModule
} from './config-data-store.module';

describe('ConfigDataStoreModule', () => {
    let configDataStoreModuleForRoot: ConfigDataStoreModule;
    let configDataStoreModuleForChild: ConfigDataStoreModule;


    it('should create an instance For Root', () => {
        configDataStoreModuleForRoot = ConfigDataStoreModule.forRoot();
        expect(configDataStoreModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        configDataStoreModuleForChild = ConfigDataStoreModule.forChild();
        expect(configDataStoreModuleForChild).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new ConfigDataStoreModule(configDataStoreModuleForRoot)).toThrowError();
    });

    it('single instance creation is allowed', () => {
        const rootStoreModule = new ConfigDataStoreModule();
        expect(rootStoreModule).toBeTruthy();
    });
});
