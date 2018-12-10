
import { NonFunctionalModule } from './non-functional.module';

describe('NonFunctionalModule', () => {
    let nonFunctionalModuleForRoot: NonFunctionalModule;
    let nonFunctionalModuleForChild: NonFunctionalModule;


    it('should create an instance For Root', () => {
        nonFunctionalModuleForRoot = NonFunctionalModule.forRoot(undefined);
        expect(nonFunctionalModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        nonFunctionalModuleForChild = NonFunctionalModule.forChild();
        expect(nonFunctionalModuleForChild).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new NonFunctionalModule(nonFunctionalModuleForRoot))
            .toThrowError();
    });

    it('single instance creation is allowed', () => {
        const nonFunctionalModule = new NonFunctionalModule();
        expect(nonFunctionalModule).toBeTruthy();
    });
});
