import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Criteria, Result, ResultSortBy, TravelClass, TravelType } from './flight-store.models';
import { FlightResultDetailFromRestApi, FlightStoreService, ResetNextFlightStoreServiceId } from './flight-store.service';
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
            date: new Date('2019-12-21'),
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
    const flightDetails: FlightResultDetailFromRestApi[] = [{
      origin: 'Pune (PNQ)',
      destination: 'Mumbai (BOM)',
      date: '2019-12-21',
      name: 'indigo',
      departureTime: '9:20',
      arrivalTime: '10:44',
      price: 1,
      flightNo: '6E-123',
    },
    {
      origin: 'Pune (PNQ)',
      destination: 'Delhi (DEL)',
      date: '2019-12-21',
      name: 'indigo',
      departureTime: '9:20',
      arrivalTime: '10:44',
      price: 2,
      flightNo: '6E-124',
    },
    {
      origin: 'Delhi (DEL)',
      destination: 'Mumbai (BOM)',
      date: '2019-12-21',
      name: 'indigo',
      departureTime: '11:44',
      arrivalTime: '14:44',
      price: 3,
      flightNo: '6E-125',
    }];
    const testData: Result = {
      flightDetails: [{
        origin: 'Pune (PNQ)',
        destination: 'Mumbai (BOM)',
        date: new Date('2019-12-21'),
        travelOrder: 1,
        name: 'indigo',
        departureTime: { hours: 9, minutes: 20 },
        arrivalTime: { hours: 10, minutes: 44 },
        duration: { hours: 1, minutes: 24 },
        price: 1,
        flightNo: '6E-123',
        stops: 0,
      },
      {
        origin: 'Pune (PNQ)',
        destination: 'Mumbai (BOM)',
        date: new Date('2019-12-21'),
        travelOrder: 1,
        name: 'Multiple',
        departureTime: { hours: 9, minutes: 20 },
        arrivalTime: { hours: 14, minutes: 44 },
        duration: { hours: 5, minutes: 24 },
        price: 5,
        flightNo: '6E-124 => 6E-125',
        stops: 1,
        multiple: [{
          origin: 'Pune (PNQ)',
          destination: 'Delhi (DEL)',
          date: new Date('2019-12-21'),
          travelOrder: 1,
          name: 'indigo',
          departureTime: { hours: 9, minutes: 20 },
          arrivalTime: { hours: 10, minutes: 44 },
          duration: { hours: 1, minutes: 24 },
          price: 2,
          flightNo: '6E-124',
          stops: 0,
        },
        {
          origin: 'Delhi (DEL)',
          destination: 'Mumbai (BOM)',
          date: new Date('2019-12-21'),
          travelOrder: 1,
          name: 'indigo',
          departureTime: { hours: 11, minutes: 44 },
          arrivalTime: { hours: 14, minutes: 44 },
          duration: { hours: 3, minutes: 0 },
          price: 3,
          flightNo: '6E-125',
          stops: 0,
        }]
      }],
      sortBy: ResultSortBy.BestFlights
    };

    it('#search should return expected Results (called once)', (done) => {
      flightStoreService.search(criteria).subscribe(
        (result) => {
          expect(result).toEqual(testData,
            'should return expected results');
          done();
        },
        fail
      );

      // configService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(flightStoreService.searchUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(flightDetails);
    });

    it('#search should be OK returning no results', (done) => {

      flightStoreService.search(criteria).subscribe(
        result => {
          expect(result.flightDetails.length).toEqual(0, 'should have empty airports array');
          done();
        },
        fail
      );

      const req = httpTestingController.expectOne(flightStoreService.searchUrl);
      req.flush([]); // Respond with no airports
    });
  });
});
