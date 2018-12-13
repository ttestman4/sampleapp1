import {
    RootStoreModule
} from './root-store.module';

describe('RootStoreModule', () => {
    let rootStoreModuleForRoot: RootStoreModule;
    let rootStoreModuleForChild: RootStoreModule;


    it('should create an instance For Root', () => {
        rootStoreModuleForRoot = RootStoreModule.forRoot(undefined);
        expect(rootStoreModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        rootStoreModuleForChild = RootStoreModule.forChild();
        expect(rootStoreModuleForChild).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new RootStoreModule(rootStoreModuleForRoot)).toThrowError();
    });

    it('single instance creation is allowed', () => {
        const rootStoreModule = new RootStoreModule();
        expect(rootStoreModule).toBeTruthy();
    });
});
