import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Material from '@angular/material';
import { SearchComponent } from './search.component';
@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Material.MatAutocompleteModule,
    Material.MatFormFieldModule,
    Material.MatOptionModule,
    Material.MatInputModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatSelectModule,
    Material.MatRippleModule,
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
