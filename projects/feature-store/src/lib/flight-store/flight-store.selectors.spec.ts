import * as flightSelectors from './flight-store.selectors';
import { initialState } from './flight-store.reducer';
describe('selectCriteria', () => {
    it('should return Criteria', () => {
        expect(flightSelectors.selectCriteria
            .projector(initialState))
            .toBe(initialState.criteria);
    });
});
