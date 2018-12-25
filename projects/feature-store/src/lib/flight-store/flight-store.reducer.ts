import { createFeatureSelector } from '@ngrx/store';
import { isNumber } from 'non-functional';
import * as FlightActions from './flight-store.actions';
import { ResultSortBy, SearchState, TravelClass, TravelType } from './flight-store.models';

export const featureName = 'flight';

export interface State extends SearchState {
    name: string;
}

// export const flightSearchDetailAdapter: EntityAdapter<FlightSearchDetail> = createEntityAdapter<FlightSearchDetail>({
//     selectId: (a) => a.travelOrder,
//     sortComparer: (a, b) => (a.travelOrder - b.travelOrder),
// });

export const initialState: State = {
    name: 'Flight Store',
    criteria: {
        flightSearchDetails: [],
        passengers: 1,
        travelType: TravelType.Return,
        travelClass: TravelClass.Economy,
        bags: 1,
        stops: 2,
        price: 0,
    },
    result: {
        flightDetails: [],
        sortBy: ResultSortBy.BestFlights,
    }
};

export function reducer(
    state = initialState,
    action: FlightActions.FlightActionsUnion
): State {
    switch (action.type) {
        case FlightActions.FlightActionTypes.UpdateSearchCriteria: {
            return {
                ...state,
                criteria: action.payload,
            };
        }
        case FlightActions.FlightActionTypes.UpdatePriceFilter: {
            return {
                ...state,
                criteria: {
                    ...state.criteria,
                    price: ((isNumber(action.payload) &&
                        (<number>(action.payload)) >= 0) ?
                        (<number>(action.payload)) : 0)
                },
            };
        }
        case FlightActions.FlightActionTypes.SearchSuccess: {
            return {
                ...state,
                result: action.payload
            };
        }
        default: {
            return state;
        }
    }
}


export const selectSearchState = createFeatureSelector<SearchState>(featureName);
