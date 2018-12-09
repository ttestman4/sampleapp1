
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
});
