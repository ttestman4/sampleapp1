import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NonFunctionalModule, CustomLoggerLevel } from 'non-functional';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NonFunctionalModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: CustomLoggerLevel.DEBUG,
      serverLogLevel: CustomLoggerLevel.ERROR,
      disableConsoleLogging: false,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
