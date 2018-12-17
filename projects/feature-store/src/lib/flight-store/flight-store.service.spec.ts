import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Result, ResultSortBy } from './flight-store.models';
import { FlightStoreService, ResetNextFlightStoreServiceId } from './flight-store.service';
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

  /// service method tests begin ///
  const testData: Result = {
    flightDetails: [{
      from: 'BOM',
      to: 'DEL',
      startDate: new Date('2019-11-17'),
      travelOrder: 1,
      airline: 'indigo',
      startTime: { hours: 9, minutes: 20 },
      arrivalTime: { hours: 16, minutes: 19 },
      duration: { hours: 7, minutes: 10 },
      cost: 1,
      code: '6E-123',
    }],
    sortBy: ResultSortBy.BestFlights
  };

  it('#search should return expected Results (called once)', () => {
    flightStoreService.search().subscribe(
      (result) => expect(result).toEqual(testData,
        'should return expected results'),
      fail
    );

    // configService should have made one request to GET heroes from expected URL
    const req = httpTestingController.expectOne(flightStoreService.searchUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock heroes
    req.flush(testData);
  });

  it('#search should be OK returning no results', () => {

    flightStoreService.search().subscribe(
      result => expect(result.flightDetails.length).toEqual(0, 'should have empty airports array'),
      fail
    );

    const req = httpTestingController.expectOne(flightStoreService.searchUrl);
    req.flush({ 'flightDetails': [], sortBy: ResultSortBy.BestFlights }); // Respond with no airports
  });

});
