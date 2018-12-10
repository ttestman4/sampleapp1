import { ErrorHandler, Injectable } from '@angular/core';
import { CustomLogger } from '../custom-logger/custom-logger.module';

export let nextAppErrorHandlerServiceId = 1;

export function RestNextAppErrorHandlerServiceId() {
  nextAppErrorHandlerServiceId = 1;
}

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerService implements ErrorHandler {
  private errorHandler: ErrorHandler;

  constructor(private customLogger: CustomLogger) {
    const id = nextAppErrorHandlerServiceId++;
    if (id > 1) {
      throw new Error(
        'AppErrorHandlerService is already loaded. Import it in the AppModule only');
    }

    this.errorHandler = new ErrorHandler();
  }

  handleError(error: any) {
    this.errorHandler.handleError(error);
    // Send the error to application logging service
    this.customLogger.error('Unknown-Error', error);
  }
}
