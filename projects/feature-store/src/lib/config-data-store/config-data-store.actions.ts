import { Action } from '@ngrx/store';
import { Airport } from './config-data-store.models';

export enum ConfigDataActionTypes {
    // LoadConfig = '[ConfigData] Load Config Data',
    // LoadAirports = '[ConfigData] Load Airports',
    LoadAirportsSuccess = '[ConfigData] Load Airports Success',
    // LoadAirportsFailuer = '[ConfigData] Load Airports Failuer',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
// export class LoadConfig implements Action {
//     readonly type = ConfigDataActionTypes.LoadConfig;

//     constructor() { }
// }

// export class LoadAirports implements Action {
//     readonly type = ConfigDataActionTypes.LoadAirports;

//     constructor() { }
// }

export class LoadAirportsSuccess implements Action {
    readonly type = ConfigDataActionTypes.LoadAirportsSuccess;

    constructor(public payload: Airport[]) { }
}

// export class LoadAirportsFailuer implements Action {
//     readonly type = ConfigDataActionTypes.LoadAirportsSuccess;

//     constructor() { }
// }

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ConfigDataActionsUnion =
    // LoadConfig |
    // LoadAirports |
    LoadAirportsSuccess; // |
   // LoadAirportsFailuer;

