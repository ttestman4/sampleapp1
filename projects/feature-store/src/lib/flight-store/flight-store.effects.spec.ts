import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as flightStoreActions from './flight-store.actions';
import { FlightEffects, ResetNextFlightEffectsId } from './flight-store.effects';
import * as FlightModels from './flight-store.models';
import { FlightStoreService } from './flight-store.service';



describe('FlightEffects', () => {
    let effects: FlightEffects;
    let flightStoreService: FlightStoreService;
    let actions$: Observable<any>;

    beforeEach(() => {
        ResetNextFlightEffectsId();
        TestBed.configureTestingModule({
            providers: [
                FlightEffects,
                {
                    provide: FlightStoreService,
                    useValue: { search: jest.fn() },
                },
                provideMockActions(() => actions$),
            ],
        });

        effects = TestBed.get(FlightEffects);
        flightStoreService = TestBed.get(FlightStoreService);
        actions$ = TestBed.get(Actions);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new FlightEffects(actions$, flightStoreService)).toThrowError();
    });

    describe('search$', () => {
        it('should return success action', () => {
            const result: FlightModels.Result = {
                flightDetails: [{
                    from: 'BOM',
                    to: 'DEL',
                    startDate: new Date('2019-11-17'),
                    travelOrder: 1,
                    airline: 'indigo',
                    startTime: { hours: 9, minutes: 20 },
                    arrivalTime: { hours: 16, minutes: 19 },
                    duration: { hours: 7, minutes: 10 },
                    cost: 1,
                    code: '6E-123',
                }],
                sortBy: FlightModels.ResultSortBy.BestFlights
            };
            const action = new flightStoreActions.Search();
            const responseAction1 = new flightStoreActions.SearchSuccess(result);

            actions$ = hot('-a---', { a: action });
            const response = cold('-k|', { k: result });
            const expected = cold('--p-', { p: responseAction1 });
            flightStoreService.search = jest.fn(() => response);

            expect(effects.search$).toBeObservable(expected);
        });

        it('should return fail action', () => {
            const action = new flightStoreActions.Search();
            const responseAction1 = new flightStoreActions.SearchFailuer();
            const error = 'Unexpected Error. Try again later.';
            actions$ = hot('-a---', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('--p-', { p: responseAction1 });
            flightStoreService.search = jest.fn(() => response);

            expect(effects.search$).toBeObservable(expected);
        });
    });

});
