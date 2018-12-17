import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as FlightActions from './flight-store.actions';
import * as FlightModels from './flight-store.models';
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
        switchMap((_action) => {
            return this.flightService.search().pipe(
                map((response: FlightModels.Result) => {
                    return new FlightActions.SearchSuccess(response);
                }),
                catchError(_err => {
                    return of(new FlightActions.SearchFailuer());
                }));
        })
    );

    constructor(
        private actions$: Actions<FlightActions.FlightActionsUnion>,
        private flightService: FlightStoreService
    ) {
        const id = nextFlightEffectsId++;
        if (id > 1) {
            throw new Error(
                'FlightEffects is already loaded. Import it in the AppModule only');
        }
    }
}
