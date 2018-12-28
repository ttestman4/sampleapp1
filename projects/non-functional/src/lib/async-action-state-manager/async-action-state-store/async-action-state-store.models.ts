import { Action } from '@ngrx/store';

export enum AsyncStatus {
    Off = '[Async Status] Off',
    Start = '[Async Status] Start',
    Success = '[Async Status] Success',
    Error = '[Async Status] Error',
}

export interface AsyncActionState {
    asyncActionId: string;
    status: AsyncStatus;
}

export interface AsyncAction extends Action {
    asyncActionState: AsyncActionState;
}
