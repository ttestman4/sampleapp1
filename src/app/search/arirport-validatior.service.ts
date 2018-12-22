import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as FeatuerStore from 'feature-store';
import * as NonFunctional from 'non-functional';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArirportValidatiorService implements AsyncValidator {

  constructor(private store: Store<FeatuerStore.ConfigData>) { }

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.store.pipe(
      select(FeatuerStore.selectAirports),
      filter((airports) => airports.length > 0),
      map(airports => {
        const validCode = airports.find((ele: FeatuerStore.Airport) =>
          ele.displayText.toLowerCase() === control.value.toLowerCase());
        return NonFunctional.isUndefined(validCode) ? { 'invalidCode': { value: control.value } } : null;
      }),
      take(1),
      catchError(() => of(null))
    );
  }
}
