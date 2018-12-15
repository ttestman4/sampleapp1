import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigDataEffects } from './config-data-store.effects';
import { reducer } from './config-data-store.reducer';

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
    StoreModule.forFeature('configdata', reducer),
    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ConfigDataEffects]),
    HttpClientModule,
  ]
})
export class ConfigDataStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: ConfigDataStoreModule) {
    if (parentModule) {
      throw new Error(
        'ConfigDataStoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConfigDataStoreModule,
      providers: [
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: ConfigDataStoreModule,
      providers: [
      ]
    };
  }
  static forTestReset() {
  }
}
