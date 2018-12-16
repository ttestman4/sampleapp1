import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AirportData } from './config-data-store.models';
import { ConfigDataStoreService, ResetNextConfigDataStoreServiceId } from './config-data-store.service';
describe('ConfigDataStoreService', () => {
  let httpTestingController: HttpTestingController;
  let configService: ConfigDataStoreService;

  beforeEach(() => {
    ResetNextConfigDataStoreServiceId();
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [
        ConfigDataStoreService,
      ]
    });
    configService = TestBed.get(ConfigDataStoreService);
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.get(HttpTestingController);
  });


  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(configService).toBeTruthy();
  });

  it('duplicate instance creation not allowed', () => {
    expect(() => new ConfigDataStoreService()).toThrowError();
  });

  /// service method tests begin ///
  const testData: AirportData = {
    'data': [
      {
        'code': 'BOM',
        'name': 'MUMBAI'
      },
      {
        'code': 'GOI',
        'name': 'GOA'
      }
    ]
  };

  const expectedAirports = testData.data;

  it('#getAirports should return expected Airports (called once)', () => {
    configService.getAirports().subscribe(
      (airports) => expect(airports).toEqual(expectedAirports,
        'should return expected airports'),
      fail
    );

    // configService should have made one request to GET heroes from expected URL
    const req = httpTestingController.expectOne(configService.airportUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock heroes
    req.flush(testData);
  });

  it('#getAirports should be OK returning no airports', () => {

    configService.getAirports().subscribe(
      airports => expect(airports.length).toEqual(0, 'should have empty airports array'),
      fail
    );

    const req = httpTestingController.expectOne(configService.airportUrl);
    req.flush({ 'data': [] }); // Respond with no airports
  });

});
