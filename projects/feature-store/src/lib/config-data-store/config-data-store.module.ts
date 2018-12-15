import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
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
