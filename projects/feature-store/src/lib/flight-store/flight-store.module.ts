import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FlightEffects, ResetNextFlightEffectsId } from './flight-store.effects';
import { featureName, reducer } from './flight-store.reducer';
import { ResetNextFlightStoreServiceId } from './flight-store.service';

export * from './flight-store.actions';
export * from './flight-store.models';
export * from './flight-store.selectors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(featureName, reducer),
    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([FlightEffects]),
    HttpClientModule,
  ],
  providers: [
    FlightEffects,
  ]
})
export class FlightStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: FlightStoreModule) {
    if (parentModule) {
      throw new Error(
        'FlightStoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FlightStoreModule,
      providers: [
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: FlightStoreModule,
      providers: [
      ]
    };
  }
  static forTestReset() {
    ResetNextFlightStoreServiceId();
    ResetNextFlightEffectsId();
  }
}
