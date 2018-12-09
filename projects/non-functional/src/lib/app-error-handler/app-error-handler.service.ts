import { Injectable, ErrorHandler } from '@angular/core';
import { CustomLogger } from '../custom-logger/custom-logger.module';
@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerService implements ErrorHandler {
  private errorHandler: ErrorHandler;

  constructor(private customLogger: CustomLogger) {
    this.errorHandler = new ErrorHandler();
  }

  handleError(error: any) {
    this.errorHandler.handleError(error);
    // Send the error to application logging service
    this.customLogger.error('Unknown-Error', error);
  }
}
