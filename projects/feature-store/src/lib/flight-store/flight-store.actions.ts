import { Action } from '@ngrx/store';
import * as FlightModels from './flight-store.models';
export enum FlightActionTypes {
    Search = '[Flight Store] Search',
    SearchSuccess = '[Flight Store] Search Success',
    SearchFailuer = '[Flight Store] Search Failuer',
    UpdateSearchCriteria = '[Flight Store] Update Search Criteria',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
    readonly type = FlightActionTypes.Search;
    constructor() { }
}

export class SearchSuccess implements Action {
    readonly type = FlightActionTypes.SearchSuccess;
    constructor(public payload: FlightModels.Result) { }
}
export class SearchFailuer implements Action {
    readonly type = FlightActionTypes.SearchFailuer;
    constructor() { }
}

export class UpdateSearchCriteria implements Action {
    readonly type = FlightActionTypes.UpdateSearchCriteria;
    constructor(public payload: FlightModels.Criteria) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FlightActionsUnion =
    Search |
    SearchSuccess |
    SearchFailuer |
    UpdateSearchCriteria;

