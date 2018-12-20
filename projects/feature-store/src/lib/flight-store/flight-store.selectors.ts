import { createSelector } from '@ngrx/store';
import { selectSearchState } from './flight-store.reducer';

export const selectCriteria = createSelector(selectSearchState,
    (searchData) => searchData.criteria
);
