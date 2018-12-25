import * as flightSelectors from './flight-store.selectors';
import { initialState } from './flight-store.reducer';
describe('selectCriteria', () => {
    it('should return Criteria', () => {
        expect(flightSelectors.selectCriteria
            .projector(initialState))
            .toBe(initialState.criteria);
    });
});

describe('selectPriceFilter', () => {
    it('should return Price', () => {
        expect(flightSelectors.selectPriceFilter
            .projector(initialState.criteria))
            .toBe(initialState.criteria.price);
    });
});

describe('selectResult', () => {
    it('should return Result', () => {
        expect(flightSelectors.selectResult
            .projector(initialState))
            .toBe(initialState.result);
    });
});

describe('selecResultFlightDetailsListAll', () => {
    it('should return FlightDetailsList array of array', () => {
        expect(flightSelectors.selecResultFlightDetailsListAll
            .projector(initialState.result))
            .toBe(initialState.result.flightDetails);
    });
});

describe('selectMaxPrice', () => {
    it('should return max price', () => {
        expect(flightSelectors.selectMaxPrice
            .projector(initialState.result.flightDetails))
            .toBe(0);
    });
});
