import { createSelector } from '@ngrx/store';
import { selectSearchState } from './flight-store.reducer';

export const selectCriteria = createSelector(selectSearchState,
    (searchData) => searchData.criteria
);

export const selectCriteriaFlightDetails = createSelector(selectCriteria,
    (criteria) => criteria.flightSearchDetails
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
        }, 0);
    }
);

export const selectResultFlightDetailsListAllFilteredByPrice = createSelector(
    selectPriceFilter, selecResultFlightDetailsListAll,
    (price, flightDetailsListAll) => {
        return flightDetailsListAll.map(flightDetailsList => {
            return flightDetailsList.filter(flightDetails => {
                return price > 0 ? flightDetails.price <= price : true;
            });
        });
    }
);
