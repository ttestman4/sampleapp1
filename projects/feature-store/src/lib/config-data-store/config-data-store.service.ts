import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Airport , AirportData} from './config-data-store.models';

let nextConfigDataStoreServiceId = 1;

export function ResetNextConfigDataStoreServiceId() {
  nextConfigDataStoreServiceId = 1;
}


@Injectable({
  providedIn: 'root'
})
export class ConfigDataStoreService {
  airportUrl = 'assets/airports.json';

  getAirports(): Observable<Airport[]> {
    return this.http.get<AirportData>(this.airportUrl).pipe(
      map((response) => {
        return response.data.map((airport) => {
          airport.displayText = airport.city + ' (' + airport.code + ')';
          return airport;
        });
      })
    );
  }

  constructor(private http: HttpClient) {
    const id = nextConfigDataStoreServiceId++;
    if (id > 1) {
      throw new Error(
        'ConfigDataStoreService is already loaded. Import it in the AppModule only');
    }
  }
}
