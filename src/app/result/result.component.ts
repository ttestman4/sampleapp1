import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FeatuerStore from 'feature-store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'spa-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  result$: Observable<FeatuerStore.Result>;
  resultSubscription: Subscription;
  flightListAll: FeatuerStore.FlightResultDetail[][] = [];
  constructor(private store: Store<FeatuerStore.SearchState>) {
    this.result$ = this.store.pipe(
      select(FeatuerStore.selectResult)
    );
    this.resultSubscription = this.result$.subscribe((res) =>
      this.flightListAll = res.flightDetails
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }
}
