import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as FeatuerStore from 'feature-store';
import { Observable } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
@Component({
  selector: 'spa-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  fromCtrl = new FormControl();
  toCtrl = new FormControl();
  airports$: Observable<FeatuerStore.Airport[]>;

  constructor(private store: Store<FeatuerStore.ConfigData>) {
    this.airports$ = this.fromCtrl.valueChanges
      .pipe(
        startWith(''),
        withLatestFrom(this.store.pipe(
          select(FeatuerStore.selectAirports)
        ), (typeAheadText, airports) => ({ typeAheadText, airports })),
        map(data => {
          return data.typeAheadText ?
            this._filterAirport(data.typeAheadText, data.airports) :
            data.airports.slice();
        })
      );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  private _filterAirport(value: string, airports: FeatuerStore.Airport[]): FeatuerStore.Airport[] {
    const filterValue = value.toLowerCase();
    return airports.filter(airport => airport.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
