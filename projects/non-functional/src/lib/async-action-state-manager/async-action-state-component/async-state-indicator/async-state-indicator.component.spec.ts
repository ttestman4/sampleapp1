import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigureFn, configureTests } from '../../../../lib/testing';
import { AsyncStateIndicatorComponent } from './async-state-indicator.component';
import * as Material from '@angular/material';
import { CommonModule } from '@angular/common';
import { AsyncActionStateStoreModule} from '../../async-action-state-store/async-action-state-store.module';
import { RootStoreModule } from '../../../root-store/root-store.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AsyncStateIndicatorComponent', () => {
  let component: AsyncStateIndicatorComponent;
  let fixture: ComponentFixture<AsyncStateIndicatorComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
      testBed.configureTestingModule({
        declarations: [AsyncStateIndicatorComponent],
        imports: [
          CommonModule,
          NoopAnimationsModule,
          Material.MatProgressBarModule,
          Material.MatProgressSpinnerModule,
          AsyncActionStateStoreModule.forRoot(),
          RootStoreModule.forRoot({
            debugStore: false,
          }),
          RouterTestingModule.withRoutes([])
        ],
        schemas: [NO_ERRORS_SCHEMA],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(AsyncStateIndicatorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
