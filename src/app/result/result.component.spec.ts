import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightStoreModule } from 'feature-store';
import { CustomLoggerLevel, NonFunctionalModule } from 'non-functional';
import { ConfigureFn, configureTests } from '../../lib/testing';
import { ResultComponent } from './result.component';


describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async(() => {
    NonFunctionalModule.forTestReset();
    FlightStoreModule.forTestReset();
    const configure: ConfigureFn = testBed => {
      testBed.configureTestingModule({
        declarations: [ResultComponent],
        imports: [
          NoopAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          NonFunctionalModule.forRoot({
            serverLoggingUrl: '/api/logs',
            level: CustomLoggerLevel.DEBUG,
            serverLogLevel: CustomLoggerLevel.ERROR,
            disableConsoleLogging: true,
            debugStore: false
          }),
          // ConfigDataStoreModule.forChild(),
          FlightStoreModule.forRoot(),
          RouterTestingModule.withRoutes([]),
        ],
        schemas: [NO_ERRORS_SCHEMA],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(ResultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('snaps', () => {
    expect(fixture).toMatchSnapshot();
  });
});
