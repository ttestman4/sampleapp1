import { ModuleWithProviders, NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { featureName, reducer } from './async-action-state-store.reducer';
import { ResetNextAsyncActionEffectsId, AsyncActionStateEffects } from './async-action-state-store.effects';

export * from './async-action-state-store.actions';
export * from './async-action-state-store.models';
export * from './async-action-state-store.decorator';
export * from './async-action-state-store.selectors';
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
    EffectsModule.forFeature([AsyncActionStateEffects]),
  ]
})
export class AsyncActionStateStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: AsyncActionStateStoreModule) {
    if (parentModule) {
      throw new Error(
        'AsyncActionStateStoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsyncActionStateStoreModule
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: AsyncActionStateStoreModule,
    };
  }
  static forTestReset() {
    ResetNextAsyncActionEffectsId();
  }
}
