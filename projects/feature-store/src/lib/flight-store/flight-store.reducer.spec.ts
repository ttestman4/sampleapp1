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
                origin: 'BOM',
                destination: 'GOI',
                date: new Date('2018-12-17'),
                travelOrder: 1,
                departureAfterTime: { hours: 9, minutes: 20 },
                departureBeforeTime: { hours: 16, minutes: 19 },
            };
            const action = new FlighActions.UpsertFlightSearchDetails(flightSearchDetails);

            resultFromPreviousStep = reducer(initialState, action);

            expect(resultFromPreviousStep).toMatchSnapshot();
        });

        it('Valid action should return the updated FlightSearchDetailsState', () => {
            const flightSearchDetails: FlightModels.FlightSearchDetail = {
                origin: 'BOM',
                destination: 'DEL',
                date: new Date('2019-11-17'),
                travelOrder: 1,
                departureAfterTime: { hours: 9, minutes: 20 },
                departureBeforeTime: { hours: 16, minutes: 19 },
            };
            const action = new FlighActions.UpsertFlightSearchDetails(flightSearchDetails);

            resultFromPreviousStep = reducer(resultFromPreviousStep, action);

            expect(resultFromPreviousStep).toMatchSnapshot();
        });

        it('Valid action should return the added FlightSearchDetailsState', () => {
            const flightSearchDetails: FlightModels.FlightSearchDetail = {
                origin: 'GOI',
                destination: 'BOM',
                date: new Date('2018-12-17'),
                travelOrder: 2,
                departureAfterTime: { hours: 9, minutes: 20 },
                departureBeforeTime: { hours: 16, minutes: 19 },
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
                    origin: 'BOM',
                    destination: 'DEL',
                    date: new Date('2019-11-17'),
                    travelOrder: 1,
                    name: 'indigo',
                    departureTime: { hours: 9, minutes: 20 },
                    arrivalTime: { hours: 16, minutes: 19 },
                    duration: { hours: 7, minutes: 10 },
                    price: 1,
                    flightNo: '6E-123',
                }],
                sortBy: FlightModels.ResultSortBy.BestFlights
            };
            const action = new FlighActions.SearchSuccess(result);

            resultFromPreviousStep = reducer(resultFromPreviousStep, action);

            expect(resultFromPreviousStep).toMatchSnapshot();
        });
    });
});
