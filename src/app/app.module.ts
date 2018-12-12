import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomLoggerLevel, NonFunctionalModule } from 'non-functional';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


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
