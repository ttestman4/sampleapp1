import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as FlightModels from './flight-store.models';

let nextFlightStoreServiceId = 1;

export function ResetNextFlightStoreServiceId() {
  nextFlightStoreServiceId = 1;
}


@Injectable({
  providedIn: 'root'
})
export class FlightStoreService {
  searchUrl = 'assets/search.json';

  search(_criteria: FlightModels.Criteria): Observable<FlightModels.Result> {
    // TBD: In real implementation this is going to post call.
    // Need good deployment mechanics to simulat post call.
    return this.http.get<FlightModels.Result>(this.searchUrl);
  }

  constructor(private http: HttpClient) {
    const id = nextFlightStoreServiceId++;
    if (id > 1) {
      throw new Error(
        'FlightStoreService is already loaded. Import it in the AppModule only');
    }
  }
}
