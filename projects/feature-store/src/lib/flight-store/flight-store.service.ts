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
  name: string;
  departureTime: string;
  arrivalTime: string;
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
            price: ele.price * criteria.passengers,
            flightNo: ele.flightNo,
            stops: 0,
          };
          return resultEle;
        });
      }),
      map((response) => {
        const resultForAllFlightPlans = criteria.flightSearchDetails.map((singleFlightPlan) => {
          const result: FlightModels.FlightResultDetail[] = [];
          // Build list of direct flights
          // Filter records which match the origin and destination criteria and date
          const directFights = response.filter((ele) => {
            return (
              (ele.origin === singleFlightPlan.origin &&
                ele.destination === singleFlightPlan.destination) &&
              ele.date.valueOf() === singleFlightPlan.date.valueOf()
            );
          }).map(ele => {
            return { ...ele, travelOrder: singleFlightPlan.travelOrder };
          });

          let flightsWithOneStop: FlightModels.FlightResultDetail[] = [];

          if (criteria.stops >= 1) {
            // Build list of of flights with 1 stop
            const departureFlightsMatchingOrigin = response.filter((ele) => {
              return (
                (ele.origin === singleFlightPlan.origin &&
                  ele.destination !== singleFlightPlan.destination) &&
                ele.date.valueOf() === singleFlightPlan.date.valueOf()
              );
            });

            const arrivalFlightsMatchingOrigin = response.filter((ele) => {
              return (
                (ele.origin !== singleFlightPlan.origin &&
                  ele.destination === singleFlightPlan.destination) &&
                ele.date.valueOf() === singleFlightPlan.date.valueOf()
              );
            });


            departureFlightsMatchingOrigin.forEach((depart) => {
              const secondLegFlight = arrivalFlightsMatchingOrigin.filter((arrival) => {
                return depart.destination === arrival.origin &&
                  this.timeToMinutes(this.calculateDuration(depart.arrivalTime, arrival.departureTime)) >= 30;
              });

              const firstLegInstanceAndSecondLegListMerged =
                secondLegFlight.map((second) => {
                  const multipleFlightInstance: FlightModels.FlightResultDetail = {
                    origin: depart.origin,
                    destination: second.destination,
                    date: depart.date,
                    travelOrder: singleFlightPlan.travelOrder,
                    name: 'Multiple',
                    departureTime: depart.departureTime,
                    arrivalTime: second.arrivalTime,
                    duration: this.calculateDuration(
                      depart.departureTime,
                      second.arrivalTime
                    ),
                    price: (depart.price + second.price),
                    flightNo: depart.flightNo + ' => ' + second.flightNo,
                    stops: 1,
                    multiple: [
                      { ...depart, travelOrder: singleFlightPlan.travelOrder },
                      { ...second, travelOrder: singleFlightPlan.travelOrder }
                    ]
                  };
                  return multipleFlightInstance;
                });

              flightsWithOneStop = flightsWithOneStop.concat(firstLegInstanceAndSecondLegListMerged);
            });
          }
          return result.concat(directFights, flightsWithOneStop);
        });
        return resultForAllFlightPlans;
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

  private timeToMinutes(time: Time) {
    return time.hours * 60 + time.minutes;
  }
}
