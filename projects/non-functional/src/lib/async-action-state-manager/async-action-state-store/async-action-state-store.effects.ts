import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import * as util from '../../helper-functions/helper-functions';
import * as AsyncStateActions from './async-action-state-store.actions';
import * as AsyncStateModels from './async-action-state-store.models';

let nextAsyncActionEffectsId = 1;

export function ResetNextAsyncActionEffectsId() {
    nextAsyncActionEffectsId = 1;
}
@Injectable({
    providedIn: 'root'
})
export class AsyncActionStateEffects {

    @Effect()
    asyncStateUpdater$ = this.actions$.pipe(
        filter((action: AsyncStateModels.AsyncAction) =>
            (util.isObject(action.asyncActionState) &&
                util.isString(action.asyncActionState.asyncActionId) &&
                (action.asyncActionState.status === AsyncStateModels.AsyncStatus.Start ||
                    action.asyncActionState.status === AsyncStateModels.AsyncStatus.Success ||
                    action.asyncActionState.status === AsyncStateModels.AsyncStatus.Error))
        ),
        map(action => {
            switch (action.asyncActionState.status) {
                case AsyncStateModels.AsyncStatus.Start: {
                    return new AsyncStateActions.Start(action.asyncActionState.asyncActionId);
                }
                case AsyncStateModels.AsyncStatus.Success: {
                    return new AsyncStateActions.Success(action.asyncActionState.asyncActionId);
                }
                case AsyncStateModels.AsyncStatus.Error: {
                    return new AsyncStateActions.Error(action.asyncActionState.asyncActionId);
                }
                default: {
                    return new AsyncStateActions.Error(action.asyncActionState.asyncActionId);
                }
            }
        })
    );

    constructor(
        private actions$: Actions<AsyncStateModels.AsyncAction>
    ) {
        const id = nextAsyncActionEffectsId++;
        if (id > 1) {
            throw new Error(
                'AsyncActionStateEffects is already loaded. Import it in the AppModule only');
        }
    }
}
