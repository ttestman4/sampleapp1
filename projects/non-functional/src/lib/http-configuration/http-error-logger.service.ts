import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomLogger } from '../custom-logger/custom-logger.module';

let nextHttpErrorLoggerServiceId = 1;

export function ResetHttpErrorLoggerServiceId() {
  nextHttpErrorLoggerServiceId = 1;
}

@Injectable({
  providedIn: 'root'
})
export class HttpErrorLoggerService implements HttpInterceptor {
  constructor(private customLogger: CustomLogger) {
    const id = nextHttpErrorLoggerServiceId++;
    if (id > 1) {
      throw new Error(
        'HttpErrorLoggerService is already loaded. Import it in the AppModule only');
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(err: HttpEvent<any>): Observable<HttpEvent<any>> {
    this.customLogger.error(err);
    return throwError(err);
  }
}
