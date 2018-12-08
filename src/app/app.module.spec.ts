
import { AppModule } from './app.module';

describe('AppModule', () => {
    let appModule: AppModule;

    it('should create an instance', () => {
        appModule = new AppModule();
        expect(appModule).toBeTruthy();
    });
});