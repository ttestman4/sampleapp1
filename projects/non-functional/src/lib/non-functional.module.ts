import { NgModule } from '@angular/core';
import { NonFunctionalComponent } from './non-functional.component';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';

@NgModule({
  declarations: [NonFunctionalComponent],
  imports: [
    CustomLoggerModule],
  exports: [NonFunctionalComponent]
})
export class NonFunctionalModule { }
