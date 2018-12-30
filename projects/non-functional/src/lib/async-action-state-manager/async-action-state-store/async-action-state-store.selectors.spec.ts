import * as asyncStateSelectors from './async-action-state-store.selectors';
import { initialState } from './async-action-state-store.reducer';
describe('selectAsyncStateEntities', () => {
    it('should return Criteria', () => {
        expect(asyncStateSelectors.selectAsyncStateEntities
            .projector(initialState))
            .toBe(initialState.entities);
    });
});

