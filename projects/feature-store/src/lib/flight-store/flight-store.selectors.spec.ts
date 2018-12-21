import * as flightSelectors from './flight-store.selectors';
import { initialState } from './flight-store.reducer';
describe('selectCriteria', () => {
    it('should return Criteria', () => {
        expect(flightSelectors.selectCriteria
            .projector(initialState))
            .toBe(initialState.criteria);
    });
});

describe('selectResult', () => {
    it('should return Result', () => {
        expect(flightSelectors.selectResult
            .projector(initialState))
            .toBe(initialState.result);
    });
});
