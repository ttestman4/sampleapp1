import { createFeatureSelector } from '@ngrx/store';
import { ConfigDataActionsUnion, ConfigDataActionTypes, LoadAirportsSuccess } from './config-data-store.actions';
import { Airport, ConfigData } from './config-data-store.models';

export const featureName = 'configdata';

export interface State extends ConfigData {
    name: string;
}

export const initialState: State = {
    name: 'Config Data Store',
    airports: [],
};

export function reducer(
    state = initialState,
    action: ConfigDataActionsUnion
): State {
    switch (action.type) {
        case ConfigDataActionTypes.LoadAirportsSuccess: {
            const localAction = <LoadAirportsSuccess>action;
            let airports: Airport[];
            if (Array.isArray(localAction.payload)) {
                airports = localAction.payload;
            } else {
                airports = initialState.airports;
            }
            const result: State = {
                ...state,
                airports: airports
            };
            return result;
        }
        default: {
            return state;
        }
    }
}

export const selectConfigData = createFeatureSelector<ConfigData>(featureName);
