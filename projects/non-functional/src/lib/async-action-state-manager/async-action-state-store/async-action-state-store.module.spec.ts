
import { AsyncActionStateStoreModule } from './async-action-state-store.module';

describe('AsyncActionStateStoreModule', () => {
    let asyncActionStateStoreModuleForRoot: AsyncActionStateStoreModule;
    let asyncActionStateStoreModuleForChild: AsyncActionStateStoreModule;


    it('should create an instance For Root', () => {
        asyncActionStateStoreModuleForRoot = AsyncActionStateStoreModule.forRoot();
        expect(asyncActionStateStoreModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        asyncActionStateStoreModuleForChild = AsyncActionStateStoreModule.forChild();
        expect(asyncActionStateStoreModuleForChild).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new AsyncActionStateStoreModule(asyncActionStateStoreModuleForRoot))
            .toThrowError();
    });

    it('single instance creation is allowed', () => {
        const asyncActionStateStoreModule = new AsyncActionStateStoreModule();
        expect(asyncActionStateStoreModule).toBeTruthy();
    });
});
