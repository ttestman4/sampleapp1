import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreConfig } from './root-store.models';
import { createMetaReducers, reducers } from './root-store.reducer';
export { RootStoreConfig } from './root-store.models';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config object,
 * provided from the outside
 */
export const ROOT_STORE_CONFIG =
  new InjectionToken<RootStoreConfig>('ROOT_STORE_CONFIG');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({ logOnly: true }),
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: META_REDUCERS,
      deps: [ROOT_STORE_CONFIG],
      useFactory: createMetaReducers
    }
  ]
})
export class RootStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: RootStoreModule) {
    if (parentModule) {
      throw new Error(
        'RootStoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(config?: RootStoreConfig): ModuleWithProviders {
    StoreConfig.config = Object.assign({}, StoreConfig.config, config);
    return {
      ngModule: RootStoreModule,
      providers: [
        {
          provide: ROOT_STORE_CONFIG,
          useValue: config ? config : {}
        },
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: RootStoreModule,
      providers: [
      ]
    };
  }
  static forTestReset() {
  }
}
