
import { AsyncActionStateManagerModule } from './async-action-state-manager.module';

describe('AsyncActionStateManagerModule', () => {
    let asyncActionStateManagerModuleForRoot: AsyncActionStateManagerModule;
    let asyncActionStateManagerModuleForChild: AsyncActionStateManagerModule;


    it('should create an instance For Root', () => {
        asyncActionStateManagerModuleForRoot = AsyncActionStateManagerModule.forRoot();
        expect(asyncActionStateManagerModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        asyncActionStateManagerModuleForChild = AsyncActionStateManagerModule.forChild();
        expect(asyncActionStateManagerModuleForChild).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new AsyncActionStateManagerModule(asyncActionStateManagerModuleForRoot))
            .toThrowError();
    });

    it('single instance creation is allowed', () => {
        const asyncActionStateManagerModule = new AsyncActionStateManagerModule();
        expect(asyncActionStateManagerModule).toBeTruthy();
    });
});
