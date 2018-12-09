import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { CustomLoggerModule, CustomLogger } from '../custom-logger/custom-logger.module';
import { AppErrorHandlerService } from './app-error-handler.service';

describe('AppErrorHandlerService', () => {
  let service: ErrorHandler;
  let customLogger: CustomLogger;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CustomLoggerModule.forRoot(undefined)
      ],
      providers: [
        {
          provide: ErrorHandler,
          useClass: AppErrorHandlerService
        },
      ],
    });
    service = TestBed.get(ErrorHandler);
    customLogger = TestBed.get(CustomLogger);

    jest.spyOn(customLogger, 'error').mockImplementation(() => undefined);
    // Mock implementation of console.error to
    // return undefined to stop printing out to console log during test
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call error method of logger service', () => {
    const err = new Error('TestError');
    service.handleError(err);
    expect(customLogger.error).toHaveBeenCalled();
  });
});
