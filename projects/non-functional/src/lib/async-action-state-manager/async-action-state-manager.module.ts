import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AsyncActionStateStoreModule } from './async-action-state-store/async-action-state-store.module';

export * from './async-action-state-store/async-action-state-store.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AsyncActionStateStoreModule
  ]
})
export class AsyncActionStateManagerModule {
  constructor(@Optional() @SkipSelf() parentModule: AsyncActionStateManagerModule) {
    if (parentModule) {
      throw new Error(
        'AsyncActionStateManagerModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AsyncActionStateManagerModule
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: AsyncActionStateManagerModule,
    };
  }
  static forTestReset() {
    AsyncActionStateStoreModule.forTestReset();
  }
}
