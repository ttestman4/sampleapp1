import { TestBed } from '@angular/core/testing';
import { Actions, UPDATE_EFFECTS } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as ConfigDataStoreActions from './config-data-store.actions';
import { ConfigDataEffects, ResetNextConfigDataEffectsId } from './config-data-store.effects';
import { Airport } from './config-data-store.models';
import { ConfigDataStoreService } from './config-data-store.service';



describe('ConfigDataEffects', () => {
    let effects: ConfigDataEffects;
    let configDataStoreService: ConfigDataStoreService;
    let actions$: Observable<any>;

    beforeEach(() => {
        ResetNextConfigDataEffectsId();
        TestBed.configureTestingModule({
            providers: [
                ConfigDataEffects,
                {
                    provide: ConfigDataStoreService,
                    useValue: { getAirports: jest.fn() },
                },
                provideMockActions(() => actions$),
            ],
        });

        effects = TestBed.get(ConfigDataEffects);
        configDataStoreService = TestBed.get(ConfigDataStoreService);
        actions$ = TestBed.get(Actions);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new ConfigDataEffects(actions$, configDataStoreService)).toThrowError();
    });

    describe('init$', () => {
        it('should return action for load config data', () => {

            const responseAction1 = new ConfigDataStoreActions.LoadConfig();
            effects.init$.subscribe((action) => expect(action).toEqual(responseAction1));
        });
    });

    describe('loadConfigData$', () => {
        it('should return action for each config data item to be loaded from rest api', () => {
            const action = new ConfigDataStoreActions.LoadConfig();
            const responseAction1 = new ConfigDataStoreActions.LoadAirports();

            actions$ = hot('-a---', { a: action });
            const expected = cold('-(p)---', { p: responseAction1 });

            expect(effects.loadConfigData$).toBeObservable(expected);
        });
    });

    describe('loadAirports$', () => {
        it('should return success action', () => {
            const airports: Airport[] = [
                {
                    'code': 'BOM',
                    'city': 'Mumbai',
                    'name': 'Chatrapati Shivaji Airport',
                },
                {
                    'code': 'GOI',
                    'name': 'Dhambolian AIrport',
                    'city': 'Goa',
                }
            ];
            const action = new ConfigDataStoreActions.LoadAirports();
            const responseAction1 = new ConfigDataStoreActions.LoadAirportsSuccess(airports);

            actions$ = hot('-a---', { a: action });
            const response = cold('-k|', { k: airports });
            const expected = cold('--p-', { p: responseAction1 });
            configDataStoreService.getAirports = jest.fn(() => response);

            expect(effects.loadAirports$).toBeObservable(expected);
        });

        it('should return fail action', () => {
            const action = new ConfigDataStoreActions.LoadAirports();
            const responseAction1 = new ConfigDataStoreActions.LoadAirportsFailuer();
            const error = 'Unexpected Error. Try again later.';
            actions$ = hot('-a---', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('--p-', { p: responseAction1 });
            configDataStoreService.getAirports = jest.fn(() => response);

            expect(effects.loadAirports$).toBeObservable(expected);
        });
    });

});
