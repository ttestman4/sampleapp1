import * as AsyncStateModels from './async-action-state-store.models';

export function AsyncActionStart(actionId: string) {
    return startClassDecorator;

    function startClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            asyncActionState: AsyncStateModels.AsyncActionState = {
                asyncActionId: actionId,
                status: AsyncStateModels.AsyncStatus.Start,
            };
        };
    }
}

export function AsyncActionSuccess(actionId: string) {
    return successClassDecorator;

    function successClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            asyncActionState: AsyncStateModels.AsyncActionState = {
                asyncActionId: actionId,
                status: AsyncStateModels.AsyncStatus.Success,
            };
        };
    }
}

export function AsyncActionError(actionId: string) {
    return errorClassDecorator;

    function errorClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            asyncActionState: AsyncStateModels.AsyncActionState = {
                asyncActionId: actionId,
                status: AsyncStateModels.AsyncStatus.Error,
            };
        };
    }
}
