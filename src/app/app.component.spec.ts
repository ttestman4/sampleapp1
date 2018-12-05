import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigureFn, configureTests } from '../lib/testing';

import { AppComponent } from './app.component';
import { NonFunctionalModule, CustomLoggerLevel } from 'non-functional';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(
    async(() => {
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          declarations: [AppComponent],
          imports: [
            NoopAnimationsModule,
            NonFunctionalModule.forRoot({
              serverLoggingUrl: '/api/logs',
              level: CustomLoggerLevel.DEBUG,
              serverLogLevel: CustomLoggerLevel.ERROR,
              disableConsoleLogging: false,
            })
          ],
          schemas: [NO_ERRORS_SCHEMA],
        });
      };

      configureTests(configure).then(testBed => {
        fixture = testBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  it('should create the app',
    async(() => {
      const app = component;
      expect(app).toBeTruthy();
    })
  );

  it('snaps', () => {
    expect(fixture).toMatchSnapshot();
  });

  it(`should have as title 'spa'`,
    async(() => {
      const app = component;
      expect(app.title).toEqual('spa');
    })
  );

  it(
    'should render title in a h1 tag',
    async(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Welcome to spa!');
    })
  );
});
