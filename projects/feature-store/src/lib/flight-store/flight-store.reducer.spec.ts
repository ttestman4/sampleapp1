import * as FlighActions from './flight-store.actions';
import * as FlightModels from './flight-store.models';
import { initialState, reducer, State } from './flight-store.reducer';
describe('Flight Reducer', () => {
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

    describe('UpdateSearchCriteria', () => {
        it('Valid action should return the added Criteria State', () => {
            const criteria: FlightModels.Criteria = {
                flightSearchDetails: [{
                    origin: 'BOM',
                    destination: 'GOI',
                    date: new Date('2018-12-17'),
                    travelOrder: 0,
                    departureAfterTime: { hours: 9, minutes: 20 },
                    departureBeforeTime: { hours: 16, minutes: 19 },
                }],
                passengers: [],
                travelType: FlightModels.TravelType.Return,
                travelClass: FlightModels.TravelClass.Economy,
                bags: 1,
                stops: 2,
                price: 0,
            };
            const action = new FlighActions.UpdateSearchCriteria(criteria);

            resultFromPreviousStep = reducer(initialState, action);

            expect(resultFromPreviousStep.criteria).toEqual(criteria);
            expect(resultFromPreviousStep).toMatchSnapshot();
        });
    });

    describe('SearchSuccess', () => {
        it('Valid action should update the result', () => {
            const result: FlightModels.Result = {
                flightDetails: [{
                    origin: 'BOM',
                    destination: 'DEL',
                    date: new Date('2019-11-17'),
                    travelOrder: 0,
                    name: 'indigo',
                    departureTime: { hours: 9, minutes: 20 },
                    arrivalTime: { hours: 16, minutes: 19 },
                    duration: { hours: 7, minutes: 10 },
                    price: 1,
                    flightNo: '6E-123',
                    stops: 0,
                }],
                sortBy: FlightModels.ResultSortBy.BestFlights
            };
            const action = new FlighActions.SearchSuccess(result);

            resultFromPreviousStep = reducer(resultFromPreviousStep, action);

            expect(resultFromPreviousStep.result).toEqual(result);
            expect(resultFromPreviousStep).toMatchSnapshot();
        });
    });
});
