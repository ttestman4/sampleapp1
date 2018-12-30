import { createSelector } from '@ngrx/store';
import { selectAsyncActionState, selectAsyncStateEntitiesFromState } from './async-action-state-store.reducer';

export const selectAsyncStateEntities = createSelector(selectAsyncActionState,
    selectAsyncStateEntitiesFromState
);
