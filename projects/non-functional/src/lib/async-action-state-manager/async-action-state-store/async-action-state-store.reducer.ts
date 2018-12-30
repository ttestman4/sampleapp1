import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import * as AsyncStateActions from './async-action-state-store.actions';
import * as AsyncStateModels from './async-action-state-store.models';

export const featureName = 'asyncState';

export interface State extends EntityState<AsyncStateModels.AsyncActionState> {
    name: string;
}

export const adapter: EntityAdapter<AsyncStateModels.AsyncActionState> = createEntityAdapter<AsyncStateModels.AsyncActionState>({
    selectId: (a) => a.asyncActionId,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    name: 'Async Action State Store',
});

export function reducer(
    state = initialState,
    action: AsyncStateActions.AsyncStateActionsUnion
): State {
    switch (action.type) {
        case AsyncStateActions.AsyncStateActionTypes.Start: {
            return adapter.upsertOne({
                asyncActionId: action.payload,
                status: AsyncStateModels.AsyncStatus.Start,
            }, state);
        }
        case AsyncStateActions.AsyncStateActionTypes.Success: {
            return adapter.upsertOne({
                asyncActionId: action.payload,
                status: AsyncStateModels.AsyncStatus.Success,
            }, state);
        }
        case AsyncStateActions.AsyncStateActionTypes.Error: {
            return adapter.upsertOne({
                asyncActionId: action.payload,
                status: AsyncStateModels.AsyncStatus.Error,
            }, state);
        }
        default: {
            return state;
        }
    }
}

export const selectAsyncActionState = createFeatureSelector<State>(featureName);

export const {
    selectEntities: selectAsyncStateEntitiesFromState,
} = adapter.getSelectors();
