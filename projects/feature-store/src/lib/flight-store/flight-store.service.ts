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

export interface FlightResultDetailFromRestApi {
  origin: string;
  destination: string;
  date: string;
  travelOrder: number;
  name: string;
  departureTime: string;
  arrivalTime: string;
  duration: Time;
  price: number;
  flightNo: string;
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
    return this.http.get<FlightResultDetailFromRestApi[]>(this.searchUrl).pipe(
      map((response) => {
        return response.map((ele) => {
          const departureTime = this.parseTime(ele.departureTime);
          const arrivalTime = this.parseTime(ele.arrivalTime);
          const duration = this.calculateDuration(
            departureTime,
            arrivalTime
          );
          const resultEle: FlightModels.FlightResultDetail = {
            // rectify result values to UI friendly data structure
            origin: ele.origin,
            destination: ele.destination,
            date: new Date(ele.date),
            travelOrder: 0,
            name: ele.name,
            departureTime,
            arrivalTime,
            duration,
            price: ele.price,
            flightNo: ele.flightNo,
          };
          return resultEle;
        });
      }),
      // Filter records which match the origin and destination criteria
      map((response) => {
        return response.filter((ele) => {
          return (
            (ele.origin === criteria.flightSearchDetails.entities[1].origin &&
              ele.destination === criteria.flightSearchDetails.entities[1].destination) &&
            ele.date.valueOf() === criteria.flightSearchDetails.entities[1].date.valueOf()
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

  private calculateDuration(time1: Time, time2: Time) {
    const result: Time = { hours: 0, minutes: 0 };
    const date1 = new Date('1995-12-11');
    const date2 = new Date('1995-12-11');
    date1.setUTCHours(time1.hours);
    date1.setUTCMinutes(time1.minutes);
    date2.setUTCHours(time2.hours);
    date2.setUTCMinutes(time2.minutes);
    const diffDate = new Date(date2.valueOf() - date1.valueOf());
    result.hours = diffDate.getUTCHours();
    result.minutes = diffDate.getUTCMinutes();

    return result;
  }
}
