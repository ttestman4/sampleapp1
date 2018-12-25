import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FeatuerStore from 'feature-store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'spa-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  flightResultSubscription: Subscription;
  flightCriteriaFlightDetailsSubscription: Subscription;
  flightListAll: FeatuerStore.FlightResultDetail[][] = [];
  flightCriteriaDetails: FeatuerStore.FlightSearchDetails[] = [];
  constructor(private store: Store<FeatuerStore.SearchState>) {
    this.flightResultSubscription = this.store.pipe(
      select(FeatuerStore.selectResultFlightDetailsListAllFilteredByPrice)
    ).subscribe((flightDetails) => {
      this.flightListAll = flightDetails;
    });

    this.flightCriteriaFlightDetailsSubscription = this.store.pipe(
      select(FeatuerStore.selectCriteriaFlightDetails)
    ).subscribe((flightDetails) => {
      this.flightCriteriaDetails = flightDetails;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.flightResultSubscription.unsubscribe();
    this.flightCriteriaFlightDetailsSubscription.unsubscribe();
  }
}
