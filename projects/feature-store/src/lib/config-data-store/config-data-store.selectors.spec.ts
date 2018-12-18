import * as configSelectors from './config-data-store.selectors';
import { initialState } from './config-data-store.reducer';
describe('selectAirports', () => {
    it('should return Airports', () => {
        expect(configSelectors.selectAirports.projector(initialState)).toBe(initialState.airports);
    });
});
