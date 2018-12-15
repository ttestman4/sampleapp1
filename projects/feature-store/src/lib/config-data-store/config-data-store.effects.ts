import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, flatMap, map, switchMap } from 'rxjs/operators';
import * as ConfigStoreActions from './config-data-store.actions';
import { Airport } from './config-data-store.models';
import { ConfigDataStoreService } from './config-data-store.service';

let nextConfigDataEffectsId = 1;

@Injectable({
    providedIn: 'root'
})
export class ConfigDataEffects {

    @Effect()
    loadAirports$ = this.actions$.pipe(
        ofType<ConfigStoreActions.LoadAirports>(ConfigStoreActions.ConfigDataActionTypes.LoadAirports),
        switchMap((_action) => {
            return this.configService.getAirports().pipe(
                map((airports: Airport[]) => {
                    return new ConfigStoreActions.LoadAirportsSuccess(airports);
                }),
                catchError(_err => {
                    return of(new ConfigStoreActions.LoadAirportsFailuer());
                }));
        })
    );

    @Effect()
    loadConfigData$ = this.actions$.pipe(
        ofType<ConfigStoreActions.LoadConfig>(ConfigStoreActions.ConfigDataActionTypes.LoadConfig),
        flatMap((_action) => {
            return [new ConfigStoreActions.LoadAirports()];
        })
    );

    // If you want to trigger another action,
    // be careful to add this effect at the end.
    // Should be your last effectyarn build
    @Effect()
    init$ = defer(() => {
        return of(new ConfigStoreActions.LoadConfig());
    });

    constructor(
        private actions$: Actions<ConfigStoreActions.ConfigDataActionsUnion>,
        private configService: ConfigDataStoreService
    ) {
        const id = nextConfigDataEffectsId++;
        if (id > 1) {
            throw new Error(
                'ConfigDataEffects is already loaded. Import it in the AppModule only');
        }
    }
}
