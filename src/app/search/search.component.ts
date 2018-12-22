import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as FeatuerStore from 'feature-store';
import * as NonFunctional from 'non-functional';
import { Observable, Subscription } from 'rxjs';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { ArirportValidatiorService } from './arirport-validatior.service';

export function AirportCodeValidator(store: Store<FeatuerStore.ConfigData>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let airports: FeatuerStore.Airport[] = [];

    if (airports.length <= 0) {
      store.pipe(
        select(FeatuerStore.selectAirports)
      ).subscribe((data) => {
        airports = data;
      }).unsubscribe();
    }

    const validCode = airports.find((ele: FeatuerStore.Airport) => ele.displayText.toLowerCase() === control.value.toLowerCase());
    return NonFunctional.isUndefined(validCode) ? { 'invalidCode': { value: control.value } } : null;
  };
}

@Component({
  selector: 'spa-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  fromAirports$: Observable<FeatuerStore.Airport[]>;
  toAirports$: Observable<FeatuerStore.Airport[]>;
  searchForm: FormGroup;
  formValueChangeSubscription: Subscription;

  get fromCtrl() {
    return this.searchForm
      .get('flightDetailsGroup.fromCtrl') as FormControl;
  }

  get toCtrl() {
    return this.searchForm
      .get('flightDetailsGroup.toCtrl') as FormControl;
  }

  get fromDateCtrl() {
    return this.searchForm
      .get('flightDetailsGroup.fromDateCtrl') as FormControl;
  }

  constructor(private store: Store<FeatuerStore.ConfigData>,
    private fb: FormBuilder,
    private airportValidatorService: ArirportValidatiorService) {
    this.searchForm = this.fb.group({
      flightDetailsGroup: this.fb.group({
        fromCtrl: [
          'Pune (PNQ)',
          [Validators.required],
          [this.airportValidatorService.validate.bind(this.airportValidatorService)]
        ],
        toCtrl: [
          '',
          [Validators.required],
          [this.airportValidatorService.validate.bind(this.airportValidatorService)]
        ],
        fromDateCtrl: [
          new Date('2020/11/01'),
          [Validators.required]
        ]
      }),
    });

    this.fromAirports$ = this.fromCtrl.valueChanges
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

    this.toAirports$ = this.toCtrl.valueChanges
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

    this.formValueChangeSubscription = this.searchForm.valueChanges.pipe(
      withLatestFrom(this.searchForm.statusChanges, (value, status) => {
        return ({ status, value });
      }),
      filter((data) => {
        return data.status === 'VALID';
      })
    ).subscribe(data => {
      this._sendUpsertFlightSearchDetailsAction(data.value);
    });

  }

  ngOnInit() {
    this.toCtrl.setValue('Delhi (DEL)');
    this._sendUpsertFlightSearchDetailsAction(this.searchForm.value);
  }

  ngOnDestroy() {
    this.formValueChangeSubscription.unsubscribe();
  }

  private _sendUpsertFlightSearchDetailsAction(value: any) {
    const flightDetails: FeatuerStore.FlightSearchDetail = {
      origin: value.flightDetailsGroup.fromCtrl,
      destination: value.flightDetailsGroup.toCtrl,
      date: value.flightDetailsGroup.fromDateCtrl,
      travelOrder: 1,
      departureAfterTime: { hours: 0, minutes: 0 },
      departureBeforeTime: { hours: 0, minutes: 0 }
    };
    this.store.dispatch(new FeatuerStore.UpsertFlightSearchDetails(flightDetails));
  }

  private _filterAirport(value: string, airports: FeatuerStore.Airport[]): FeatuerStore.Airport[] {
    const filterValue = value.toLowerCase();
    return airports.filter(airport =>
      airport.code.toLowerCase().indexOf(filterValue) >= 0 ||
      airport.city.toLowerCase().indexOf(filterValue) >= 0
    );
  }
}
