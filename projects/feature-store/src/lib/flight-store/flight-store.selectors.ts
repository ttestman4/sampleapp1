import { createSelector } from '@ngrx/store';
import { selectSearchState } from './flight-store.reducer';

export const selectCriteria = createSelector(selectSearchState,
    (searchData) => searchData.criteria
);

export const selectPriceFilter = createSelector(selectCriteria,
    (criteria) => criteria.price
);

export const selectResult = createSelector(selectSearchState,
    (searchData) => searchData.result
);

export const selecResultFlightDetailsListAll = createSelector(selectResult,
    (result) => result.flightDetails
);

export const selectMaxPrice = createSelector(selecResultFlightDetailsListAll,
    (flightDetailsListAll) => {
        return flightDetailsListAll.reduce((accumulator, currentValue) => {
            return currentValue.reduce((innerAccumulator, innerCurrentValue) => {
                return Math.max(innerAccumulator, innerCurrentValue.price);
            }, accumulator);
        }  , 0);
    }
);


