import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomLoggerLevel, NonFunctionalModule } from 'non-functional';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ConfigDataStoreModule, FlightStoreModule } from 'feature-store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NonFunctionalModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: CustomLoggerLevel.DEBUG,
      serverLogLevel: CustomLoggerLevel.ERROR,
      disableConsoleLogging: false,
      debugStore: !environment.production,
    }),
    ConfigDataStoreModule.forRoot(),
    FlightStoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
