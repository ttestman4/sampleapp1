import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightStoreModule } from 'feature-store';
import { CustomLoggerLevel, NonFunctionalModule } from 'non-functional';
import { ArirportValidatiorService } from './arirport-validatior.service';



describe('ArirportValidatiorService', () => {
  beforeEach(() => {
    NonFunctionalModule.forTestReset();
    FlightStoreModule.forTestReset();
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NonFunctionalModule.forRoot({
          serverLoggingUrl: '/api/logs',
          level: CustomLoggerLevel.DEBUG,
          serverLogLevel: CustomLoggerLevel.ERROR,
          disableConsoleLogging: true,
          debugStore: false
        }),
        // ConfigDataStoreModule.forChild(),
        FlightStoreModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should be created', () => {
    const service: ArirportValidatiorService = TestBed.get(ArirportValidatiorService);
    expect(service).toBeTruthy();
  });
});
