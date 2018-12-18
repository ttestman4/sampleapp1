// import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Material from '@angular/material';
import { SearchComponent } from './search.component';
import { ConfigDataStoreModule, FlightStoreModule } from 'feature-store';
import { CustomLoggerLevel, NonFunctionalModule } from 'non-functional';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfigureFn, configureTests } from '../../lib/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(
    async(() => {
      NonFunctionalModule.forTestReset();
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          declarations: [SearchComponent],
          imports: [
            NoopAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            Material.MatAutocompleteModule,
            Material.MatFormFieldModule,
            Material.MatOptionModule,
            Material.MatInputModule,
            NonFunctionalModule.forRoot({
              serverLoggingUrl: '/api/logs',
              level: CustomLoggerLevel.DEBUG,
              serverLogLevel: CustomLoggerLevel.ERROR,
              disableConsoleLogging: true,
              debugStore: false
            }),
            ConfigDataStoreModule.forChild(),
            // FlightStoreModule.forRoot(),
            RouterTestingModule.withRoutes([]),
          ],
          schemas: [NO_ERRORS_SCHEMA],
        });
      };

      configureTests(configure).then(testBed => {
        fixture = testBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('snaps', () => {
    expect(fixture).toMatchSnapshot();
  });
});
