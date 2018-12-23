import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as flightStoreActions from './flight-store.actions';
import { FlightEffects, ResetNextFlightEffectsId } from './flight-store.effects';
import * as FlightModels from './flight-store.models';
import { reducer } from './flight-store.reducer';
import { FlightStoreService } from './flight-store.service';

describe('FlightEffects', () => {
    let effects: FlightEffects;
    let flightStoreService: FlightStoreService;
    let actions$: Observable<any>;

    beforeEach(() => {
        ResetNextFlightEffectsId();
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    flight: combineReducers(reducer),
                }),
            ],
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
                    origin: 'BOM',
                    destination: 'DEL',
                    date: new Date('2019-11-17'),
                    travelOrder: 0,
                    name: 'indigo',
                    departureTime: { hours: 9, minutes: 20 },
                    arrivalTime: { hours: 16, minutes: 19 },
                    duration: { hours: 7, minutes: 10 },
                    price: 1,
                    flightNo: '6E-123',
                    stops: 0,
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

    describe('updateSearchCriteria$', () => {
        it('should return search action', () => {
            const criteria: FlightModels.Criteria = {
                flightSearchDetails: [{
                    origin: 'BOM',
                    destination: 'GOI',
                    date: new Date('2018-12-17'),
                    travelOrder: 0,
                    departureAfterTime: { hours: 9, minutes: 20 },
                    departureBeforeTime: { hours: 16, minutes: 19 },
                }],
                passengers: [],
                travelType: FlightModels.TravelType.Return,
                travelClass: FlightModels.TravelClass.Economy,
                bags: 1,
                stops: 2,
                price: 0,
            };
            const action = new flightStoreActions.UpdateSearchCriteria(criteria);
            const responseAction1 = new flightStoreActions.Search();

            actions$ = hot('-a---', { a: action });
            const expected = cold('-p--', { p: responseAction1 });

            expect(effects.updateSearchCriteria$).toBeObservable(expected);
        });
    });
});
