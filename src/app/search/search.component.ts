import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as FeatuerStore from 'feature-store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { ArirportValidatiorService } from './arirport-validatior.service';

@Component({
  selector: 'spa-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  fromAirports$: Observable<FeatuerStore.Airport[]>;
  toAirports$: Observable<FeatuerStore.Airport[]>;
  searchForm: FormGroup;
  formSubmitSubscription: Subscription;

  travelTypes = FeatuerStore.TravelType;

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

  get toDateCtrl() {
    return this.searchForm
      .get('flightDetailsGroup.toDateCtrl') as FormControl;
  }

  get travelTypeCtrl() {
    return this.searchForm
      .get('travelTypeCtrl') as FormControl;
  }

  get stopsCtrl() {
    return this.searchForm
      .get('stopsCtrl') as FormControl;
  }

  constructor(private store: Store<FeatuerStore.ConfigData>,
    private fb: FormBuilder,
    private airportValidatorService: ArirportValidatiorService) {
    this.searchForm = this.fb.group({
      travelTypeCtrl: [
        FeatuerStore.TravelType.Return,
        [Validators.required]
      ],
      stopsCtrl: [
        '0',
        [Validators.required]
      ],
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
        ],
        toDateCtrl: [
          new Date('2020/11/02'),
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

    this.formSubmitSubscription = combineLatest(this.searchForm.valueChanges, this.searchForm.statusChanges)
      .pipe(
        map(results => {
          return { value: results[0], status: results[1] };
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
    this.formSubmitSubscription.unsubscribe();
  }

  private _sendUpsertFlightSearchDetailsAction(value: any) {
    const criteria: FeatuerStore.Criteria = {
      flightSearchDetails: [{
        origin: value.flightDetailsGroup.fromCtrl,
        destination: value.flightDetailsGroup.toCtrl,
        date: value.flightDetailsGroup.fromDateCtrl,
        travelOrder: 0,
        departureAfterTime: { hours: 0, minutes: 0 },
        departureBeforeTime: { hours: 0, minutes: 0 }
      }],
      passengers: [],
      travelType: value.travelTypeCtrl,
      travelClass: FeatuerStore.TravelClass.Economy,
      bags: 1,
      stops: parseInt(value.stopsCtrl, 10),
      price: 0,
    };
    if (criteria.travelType === FeatuerStore.TravelType.Return) {
      criteria.flightSearchDetails.push({
        origin: value.flightDetailsGroup.toCtrl,
        destination: value.flightDetailsGroup.fromCtrl,
        date: value.flightDetailsGroup.toDateCtrl,
        travelOrder: 1,
        departureAfterTime: { hours: 0, minutes: 0 },
        departureBeforeTime: { hours: 0, minutes: 0 }
      });
    }
    this.store.dispatch(new FeatuerStore.UpdateSearchCriteria(criteria));
  }

  private _filterAirport(value: string, airports: FeatuerStore.Airport[]): FeatuerStore.Airport[] {
    const filterValue = value.toLowerCase();
    return airports.filter(airport =>
      airport.code.toLowerCase().indexOf(filterValue) >= 0 ||
      airport.city.toLowerCase().indexOf(filterValue) >= 0
    );
  }
}
