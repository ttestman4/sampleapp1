import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as FlightActions from './flight-store.actions';
import * as FlightModels from './flight-store.models';
import * as FlightSelectors from './flight-store.selectors';
import { FlightStoreService } from './flight-store.service';

let nextFlightEffectsId = 1;

export function ResetNextFlightEffectsId() {
    nextFlightEffectsId = 1;
}
@Injectable({
    providedIn: 'root'
})
export class FlightEffects {

    @Effect()
    search$ = this.actions$.pipe(
        ofType<FlightActions.Search>(FlightActions.FlightActionTypes.Search),
        withLatestFrom(this.store.pipe(
            select(FlightSelectors.selectCriteria)),
            ((action, criteria) => ({ action, criteria }))
        ),
        switchMap((data) => {
            return this.flightService.search(data.criteria).pipe(
                map((response: FlightModels.Result) => {
                    return new FlightActions.SearchSuccess(response);
                }),
                catchError(_err => {
                    return of(new FlightActions.SearchFailuer());
                }));
        })
    );

    @Effect()
    upsertFlightSearchDetails$ = this.actions$.pipe(
        ofType<FlightActions.UpsertFlightSearchDetails>(FlightActions.FlightActionTypes.UpsertFlightSearchDetails),
        map((_action) => {
            return new FlightActions.Search();
        })
    );

    constructor(
        private actions$: Actions<FlightActions.FlightActionsUnion>,
        private flightService: FlightStoreService,
        private store: Store<FlightModels.SearchState>
    ) {
        const id = nextFlightEffectsId++;
        if (id > 1) {
            throw new Error(
                'FlightEffects is already loaded. Import it in the AppModule only');
        }
    }
}
