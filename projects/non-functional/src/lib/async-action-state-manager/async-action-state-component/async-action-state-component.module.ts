import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncStateIndicatorComponent } from './async-state-indicator/async-state-indicator.component';
import * as Material from '@angular/material';

@NgModule({
  declarations: [
    AsyncStateIndicatorComponent,
  ],
  imports: [
    CommonModule,
    Material.MatProgressBarModule,
    Material.MatProgressSpinnerModule,
  ],
  exports: [
    AsyncStateIndicatorComponent,
  ]
})
export class AsyncActionStateComponentModule { }
