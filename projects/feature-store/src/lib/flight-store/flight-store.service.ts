import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as FlightModels from './flight-store.models';

let nextFlightStoreServiceId = 1;

export function ResetNextFlightStoreServiceId() {
  nextFlightStoreServiceId = 1;
}


@Injectable({
  providedIn: 'root'
})
export class FlightStoreService {
  searchUrl = 'assets/advFlightSearch.json';
  // searchUrl = 'assets/search.json';

  search(criteria: FlightModels.Criteria): Observable<FlightModels.Result> {
    // TBD: In real implementation this is going to post call.
    // Need good deployment mechanics to simulat post call.
    return this.http.get<FlightModels.FlightResultDetail[]>(this.searchUrl).pipe(
      map((response) => {
        return response.map((ele) => {
          // rectify time values to UI friendly data structure
          ele.departureTime = this.parseTime(ele.departureTime as string);
          ele.arrivalTime = this.parseTime(ele.arrivalTime as string);
          return ele;
        });
      }),
      // Filter records which match the origin and destination criteria
      map((response) => {
        return response.filter((ele) => {
          return (
            (ele.origin === criteria.flightSearchDetails.entities[1].origin ||
              ele.destination === criteria.flightSearchDetails.entities[1].destination) &&
            ele.date === '2020/11/01'
          );
        });
      }),
      map((response) => {
        return {
          flightDetails: response,
          sortBy: FlightModels.ResultSortBy.BestFlights
        };
      })
    );
  }

  constructor(private http: HttpClient) {
    const id = nextFlightStoreServiceId++;
    if (id > 1) {
      throw new Error(
        'FlightStoreService is already loaded. Import it in the AppModule only');
    }
  }

  private parseTime(timeInString: string) {
    const separator = timeInString.split(':', 2);
    const time: Time = { hours: 0, minutes: 0 };
    if (separator.length > 0) {
      time.hours = parseInt(separator[0], 10);
    }
    if (separator.length > 1) {
      time.minutes = parseInt(separator[1], 10);
    }
    return time;
  }
}
