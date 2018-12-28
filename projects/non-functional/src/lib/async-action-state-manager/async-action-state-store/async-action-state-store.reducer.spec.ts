import { initialState, reducer, State } from './async-action-state-store.reducer';
import * as AsyncStateActions from './async-action-state-store.actions';
import * as AsyncStateModels from './async-action-state-store.models';
describe('Async State Reducer', () => {
    it('Unknown action should return the initial state', () => {
        const action = {} as any;

        const result = reducer(initialState, action);
        expect(result).toEqual(initialState);
        expect(result).toMatchSnapshot();
    });

    it('Unknown action should return the initial state for undefined initial state input', () => {
        const action = {} as any;

        const result = reducer(undefined, action);
        expect(result).toEqual(initialState);
        expect(result).toMatchSnapshot();
    });

    let resultFromPreviousStep: State;

    describe('Start', () => {
        it('Valid action should return the added Async Action Id', () => {
            const action = new AsyncStateActions.Start('foo');

            resultFromPreviousStep = reducer(initialState, action);

            expect(resultFromPreviousStep.entities['foo'].status)
                .toEqual(AsyncStateModels.AsyncStatus.Start);
            expect(resultFromPreviousStep).toMatchSnapshot();
        });
    });

    describe('Success', () => {
        it('Valid action should return the added Async Action Id', () => {
            const action = new AsyncStateActions.Success('foo');

            resultFromPreviousStep = reducer(initialState, action);

            expect(resultFromPreviousStep.entities['foo'].status)
                .toEqual(AsyncStateModels.AsyncStatus.Success);
            expect(resultFromPreviousStep).toMatchSnapshot();
        });
    });

    describe('Error', () => {
        it('Valid action should return the added Async Action Id', () => {
            const action = new AsyncStateActions.Error('foo');

            resultFromPreviousStep = reducer(initialState, action);

            expect(resultFromPreviousStep.entities['foo'].status)
                .toEqual(AsyncStateModels.AsyncStatus.Error);
            expect(resultFromPreviousStep).toMatchSnapshot();
        });
    });
});
