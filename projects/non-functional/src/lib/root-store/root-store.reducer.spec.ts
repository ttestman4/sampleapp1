import { initialState, reducer } from './root-store.reducer';

describe('Root Reducer', () => {
    it('Unknown action should return the initial state', () => {
        const action = {} as any;

        const result = reducer(initialState, action);

        expect(result).toMatchSnapshot();
    });

    it('Unknown action should return the initial state for undefined initial state input', () => {
        const action = {} as any;

        const result = reducer(undefined, action);

        expect(result).toMatchSnapshot();
    });
});
