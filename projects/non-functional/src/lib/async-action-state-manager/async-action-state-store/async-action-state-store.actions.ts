import { Action } from '@ngrx/store';

export enum AsyncStateActionTypes {
    Start = '[Async Action State] Start',
    Success = '[Async Action State] Success',
    Error = '[Async Action State] Error',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Start implements Action {
    readonly type = AsyncStateActionTypes.Start;
    constructor(public payload: string) { }
}

export class Success implements Action {
    readonly type = AsyncStateActionTypes.Success;
    constructor(public payload: string) { }
}

export class Error implements Action {
    readonly type = AsyncStateActionTypes.Error;
    constructor(public payload: string) { }
}

export type AsyncStateActionsUnion =
    Start |
    Success |
    Error;
