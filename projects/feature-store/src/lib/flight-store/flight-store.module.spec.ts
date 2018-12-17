import {
    FlightStoreModule
} from './flight-store.module';

describe('FlightStoreModule', () => {
    let flightStoreModuleForRoot: FlightStoreModule;
    let flightStoreModuleForChild: FlightStoreModule;


    it('should create an instance For Root', () => {
        flightStoreModuleForRoot = FlightStoreModule.forRoot();
        expect(flightStoreModuleForRoot).toBeTruthy();
    });

    it('should create an instance For Child', () => {
        flightStoreModuleForChild = FlightStoreModule.forChild();
        expect(flightStoreModuleForChild).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new FlightStoreModule(flightStoreModuleForRoot)).toThrowError();
    });

    it('single instance creation is allowed', () => {
        const rootStoreModule = new FlightStoreModule();
        expect(rootStoreModule).toBeTruthy();
    });
});
