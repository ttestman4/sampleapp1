import { LoadAirportsSuccess } from './config-data-store.actions';
import { Airport } from './config-data-store.models';
import { initialState, reducer, State } from './config-data-store.reducer';
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

    let resultFromPreviousStep: State;
    it('Valid action should return the updated State', () => {
        const airports: Airport[] = [
            { code: 'BOM', name: 'MUMBAI' },
            { code: 'GOI', name: 'GOA' },
        ];
        const action = new LoadAirportsSuccess(airports);

        resultFromPreviousStep = reducer(initialState, action);

        expect(resultFromPreviousStep.airports.length).toEqual(airports.length);
        expect(resultFromPreviousStep.airports).toEqual(airports);
        expect(resultFromPreviousStep).toMatchSnapshot();
    });

    it('Valid action with invalid payload i.e. Non arry should be handled gracefully',
        () => {
            const action = new LoadAirportsSuccess(<Airport[]>9);

            resultFromPreviousStep = reducer(initialState, action);

            expect(resultFromPreviousStep.airports.length).toEqual(initialState.airports.length);
            expect(resultFromPreviousStep.airports).toEqual(initialState.airports);
            expect(resultFromPreviousStep).toMatchSnapshot();
         });
});
