import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FlightEffects } from './flight-store.effects';
import { reducer } from './flight-store.reducer';

export * from './flight-store.actions';
export * from './flight-store.models';

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
    StoreModule.forFeature('flight', reducer),
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
  }
}
