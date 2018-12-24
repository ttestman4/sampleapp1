import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as Material from '@angular/material';
import { ResultComponent } from './result.component';

@NgModule({
  declarations: [
    ResultComponent
  ],
  imports: [
    CommonModule,
    Material.MatListModule,
    Material.MatIconModule,
    Material.MatRippleModule,
    Material.MatLineModule,
    Material.MatDividerModule,
    Material.MatExpansionModule,
  ],
  exports: [
    ResultComponent,
  ]
})
export class ResultModule { }
