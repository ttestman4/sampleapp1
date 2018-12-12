import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CustomLogger, CustomLoggerModule } from '../custom-logger/custom-logger.module';
import { HttpErrorLoggerService, ResetHttpErrorLoggerServiceId } from './http-error-logger.service';

interface Data {
  name: string;
}

const testUrl = '/data';

describe('HttpErrorLoggerService', () => {
  let customLogger: CustomLogger;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    ResetHttpErrorLoggerServiceId();
    TestBed.configureTestingModule({
      imports: [
        CustomLoggerModule.forRoot(undefined),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorLoggerService,
          multi: true,
        },
      ]
    });

    // service = TestBed.get(HttpErrorLoggerService);
    customLogger = TestBed.get(CustomLogger);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    jest.spyOn(customLogger, 'error').mockImplementation(() => undefined);
    // Mock implementation of console.error to
    // return undefined to stop printing out to console log during test
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service = TestBed.get(HttpErrorLoggerService);
    expect(service).toBeTruthy();
  });

  it('duplicate instance creation not allowed', () => {
    const service = TestBed.get(HttpErrorLoggerService);
    expect(service).toBeTruthy();
    expect(() => new HttpErrorLoggerService(customLogger)).toThrowError();
  });

  it('can test HttpClient.get', () => {
    const testData = { name: 'Test Data' };
    // Make an HTTP GET request
    httpClient.get(testUrl)
      .subscribe(data => {
        // When observable resolves, result should match test data
        expect(data).toEqual(testData);
      }
      );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(testUrl);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();

    expect(customLogger.error).toHaveBeenCalledTimes(0);
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';

    httpClient.get(testUrl).subscribe(
      _data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testUrl);

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });

    expect(customLogger.error).toHaveBeenCalledTimes(1);
  });

  it('can test for network error', () => {
    const emsg = 'simulated network error';

    httpClient.get(testUrl).subscribe(
      _data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testUrl);

    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    // Respond with mock error
    req.error(mockError);

    expect(customLogger.error).toHaveBeenCalledTimes(1);
  });
});
