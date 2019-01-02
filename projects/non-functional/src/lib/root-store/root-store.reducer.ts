import * as fromRouter from '@ngrx/router-store';
import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';
import { RootStoreConfig } from './root-store.models';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    name: string;
    router: fromRouter.RouterReducerState;
}

export const initialState = 'Root Store';

export function reducer(state = initialState, action: Action): string {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    name: reducer,
    router: fromRouter.routerReducer,
};

// console.log all actions
export function logger<T, V extends Action = Action>(nextReducer: ActionReducer<T, V>): ActionReducer<T, V> {
    return (state, action): any => {
        const result = nextReducer(state, action);
        console.groupCollapsed(action.type);
        console.log('prev state', state);
        console.log('action', action);
        console.log('next state', result);
        console.groupEnd();

        return result;
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export function createMetaReducers(config: RootStoreConfig) {
    return config.debugStore === true
        ? [storeFreeze]
        : [];
}
