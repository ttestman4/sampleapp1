import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NonFunctionalModule } from 'non-functional';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NonFunctionalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
