import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as util from '../../../helper-functions/helper-functions';
import { AsyncActionState, AsyncStatus, selectAsyncStateEntities } from '../../async-action-state-store/async-action-state-store.module';


enum IndicatorType {
  spinner = 'spinner',
  progressBar = 'bar',
}

@Component({
  selector: 'nfl-async-state-indicator',
  templateUrl: './async-state-indicator.component.html',
  styleUrls: ['./async-state-indicator.component.css']
})
export class AsyncStateIndicatorComponent implements OnInit, OnDestroy {
  @Input()
  actionIds = '';
  @Input()
  indicatorType = IndicatorType.spinner;

  showComponent = false;
  inputIndicatorType = IndicatorType.spinner;

  private actionIdArray: string[] = [];
  private asyncActionStateSubscription: Subscription;
  private trackAllActionIds = false;

  constructor(private store: Store<AsyncActionState>) {
    this.asyncActionStateSubscription = this.store.select(selectAsyncStateEntities)
      .subscribe((entities) => {
        let result = false;
        if (this.trackAllActionIds === true) {
          this.actionIdArray = Object.keys(entities);
        }

        for (let index1 = 0; index1 < this.actionIdArray.length; index1 += 1) {
          result = util.isDefined(entities[this.actionIdArray[index1]]) ?
            entities[this.actionIdArray[index1]].status === AsyncStatus.Start : false;

          if (result === true) {
            break;
          }
        }

        this.showComponent = result;
      });
  }

  ngOnInit() {
    if (util.isString(this.actionIds) && this.actionIds.length > 0) {
      this.actionIdArray = this.actionIds.split(',');
    } else {
      this.trackAllActionIds = true;
    }

    this.inputIndicatorType = this.indicatorType;
    switch (this.indicatorType) {
      case IndicatorType.spinner: {
        this.inputIndicatorType = IndicatorType.spinner;
        break;
      }
      case IndicatorType.progressBar: {
        this.inputIndicatorType = IndicatorType.progressBar;
        break;
      }
      default: {
        this.inputIndicatorType = IndicatorType.spinner;
        break;
      }
    }
  }

  ngOnDestroy() {
    this.asyncActionStateSubscription.unsubscribe();
  }
}
