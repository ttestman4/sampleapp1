import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FeatuerStore from 'feature-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'spa-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  result$: Observable<FeatuerStore.Result>;
  constructor(private store: Store<FeatuerStore.SearchState>) {
    this.result$ = this.store.pipe(
      select(FeatuerStore.selectResult)
    );
  }

  ngOnInit() {
  }

}
