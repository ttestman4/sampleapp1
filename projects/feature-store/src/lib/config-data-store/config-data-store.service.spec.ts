import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Airport } from './config-data-store.models';
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
  const testData: Airport[] = [
    {
      'code': 'BOM',
      'name': 'Chhatrapati Shivaji International Airport',
      'city': 'Mumbai',
    },
    {
      'code': 'PNQ',
      'name': 'Pune Airport',
      'city': 'Pune'
    },
    {
      'code': 'BLR',
      'name': 'Bengaluru Airport',
      'city': 'Bengaluru'
    },
    {
      'code': 'DEL',
      'name': 'Indira Gandhi International Airport',
      'city': 'New Delhi'
    }
  ] as Airport[];

  const expectedAirports = testData.map((airport) => {
    airport.displayText = airport.city + ' (' + airport.code + ')';
    return airport;
  });

  it('#getAirports should return expected Airports (called once)', (done) => {
    configService.getAirports().subscribe(
      (airports) => {
        expect(airports).toEqual(expectedAirports, 'should return expected airports');
        done();
      },
      fail
    );

    // configService should have made one request to GET heroes from expected URL
    const req = httpTestingController.expectOne(configService.airportUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock heroes
    req.flush(testData);
  });

  it('#getAirports should be OK returning no airports', (done) => {

    configService.getAirports().subscribe(
      airports => {
        expect(airports.length).toEqual(0, 'should have empty airports array');
        done();
      },
      fail
    );

    const req = httpTestingController.expectOne(configService.airportUrl);
    req.flush([]); // Respond with no airports
  });

});
