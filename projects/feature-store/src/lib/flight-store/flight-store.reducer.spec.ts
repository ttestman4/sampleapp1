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

    describe('UpdateFlightSearchDetails', () => {
        it('Valid action should return the added FlightSearchDetailsState', () => {
            const flightSearchDetails: FlightModels.FlightSearchDetail = {
                from: 'BOM',
                to: 'GOI',
                startDate: new Date('2018-12-17T03:24:00'),
                travelOrder: 1,
                startAfterTime: { hours: 9, minutes: 20 },
                startBeforeTime: { hours: 16, minutes: 19 },
            };
            const action = new FlighActions.UpsertFlightSearchDetails(flightSearchDetails);

            resultFromPreviousStep = reducer(initialState, action);

            expect(resultFromPreviousStep).toMatchSnapshot();
        });

        it('Valid action should return the updated FlightSearchDetailsState', () => {
            const flightSearchDetails: FlightModels.FlightSearchDetail = {
                from: 'BOM',
                to: 'DEL',
                startDate: new Date('2019-11-17T03:24:00'),
                travelOrder: 1,
                startAfterTime: { hours: 9, minutes: 20 },
                startBeforeTime: { hours: 16, minutes: 19 },
            };
            const action = new FlighActions.UpsertFlightSearchDetails(flightSearchDetails);

            resultFromPreviousStep = reducer(resultFromPreviousStep, action);

            expect(resultFromPreviousStep).toMatchSnapshot();
        });

        it('Valid action should return the added FlightSearchDetailsState', () => {
            const flightSearchDetails: FlightModels.FlightSearchDetail = {
                from: 'GOI',
                to: 'BOM',
                startDate: new Date('2018-12-17T03:24:00'),
                travelOrder: 2,
                startAfterTime: { hours: 9, minutes: 20 },
                startBeforeTime: { hours: 16, minutes: 19 },
            };
            const action = new FlighActions.UpsertFlightSearchDetails(flightSearchDetails);

            resultFromPreviousStep = reducer(resultFromPreviousStep, action);

            expect(resultFromPreviousStep).toMatchSnapshot();
        });
    });

    describe('SearchSuccess', () => {
        it('Valid action should update the result', () => {
            const result: FlightModels.Result = {
                flightDetails: [{
                    from: 'BOM',
                    to: 'DEL',
                    startDate: new Date('2019-11-17T03:24:00'),
                    travelOrder: 1,
                    airline: 'indigo',
                    startTime: { hours: 9, minutes: 20 },
                    arrivalTime: { hours: 16, minutes: 19 },
                    duration: { hours: 7, minutes: 10 },
                    cost: 1,
                    code: '6E-123',
                }],
                sortBy: FlightModels.ResultSortBy.BestFlights
            };
            const action = new FlighActions.SearchSuccess(result);

            resultFromPreviousStep = reducer(resultFromPreviousStep, action);

            expect(resultFromPreviousStep).toMatchSnapshot();
        });
    });
});
