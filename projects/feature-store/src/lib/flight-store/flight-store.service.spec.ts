import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Result, ResultSortBy, Criteria, TravelType, TravelClass } from './flight-store.models';
import { FlightStoreService, ResetNextFlightStoreServiceId } from './flight-store.service';
import { FlightResultDetail } from 'feature-store/public_api';
describe('FlightStoreService', () => {
  let httpTestingController: HttpTestingController;
  let flightStoreService: FlightStoreService;

  beforeEach(() => {
    ResetNextFlightStoreServiceId();
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [
        FlightStoreService,
      ]
    });
    flightStoreService = TestBed.get(FlightStoreService);
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.get(HttpTestingController);
  });


  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(flightStoreService).toBeTruthy();
  });

  it('duplicate instance creation not allowed', () => {
    expect(() => new FlightStoreService()).toThrowError();
  });

  describe('Search', () => {
    const criteria: Criteria = {
      flightSearchDetails: {
        ids: [
          1
        ],
        entities: {
          '1': {
            origin: 'Pune (PNQ)',
            destination: 'Mumbai (BOM)',
            date: new Date('2018-12-21'),
            travelOrder: 1,
            departureAfterTime: {
              hours: 0,
              minutes: 0
            },
            departureBeforeTime: {
              hours: 0,
              minutes: 0
            }
          }
        }
      },
      passengers: [],
      travelType: TravelType.Return,
      travelClass: TravelClass.Economy,
      bags: 1,
      stops: 10,
      price: 0
    };
    /// service method tests begin ///
    const flightDetails: FlightResultDetail[] = [{
      origin: 'Pune (PNQ)',
      destination: 'Mumbai (BOM)',
      date: new Date('2019-12-21'),
      travelOrder: 1,
      name: 'indigo',
      departureTime: '9:20',
      arrivalTime: '16:19',
      duration: { hours: 7, minutes: 10 },
      price: 1,
      flightNo: '6E-123',
    }];
    const testData: Result = {
      flightDetails: [{
        origin: 'Pune (PNQ)',
        destination: 'Mumbai (BOM)',
        date: new Date('2019-12-21'),
        travelOrder: 1,
        name: 'indigo',
        departureTime: { hours: 9, minutes: 20 },
        arrivalTime: { hours: 16, minutes: 19 },
        duration: { hours: 7, minutes: 10 },
        price: 1,
        flightNo: '6E-123',
      }],
      sortBy: ResultSortBy.BestFlights
    };

    it('#search should return expected Results (called once)', () => {
      flightStoreService.search(criteria).subscribe(
        (result) => expect(result).toEqual(testData,
          'should return expected results'),
        fail
      );

      // configService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(flightStoreService.searchUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(flightDetails);
    });

    it('#search should be OK returning no results', () => {

      flightStoreService.search(criteria).subscribe(
        result => expect(result.flightDetails.length).toEqual(0, 'should have empty airports array'),
        fail
      );

      const req = httpTestingController.expectOne(flightStoreService.searchUrl);
      req.flush([]); // Respond with no airports
    });
  });
});
