import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './time.pipe';
import { DurationPipe } from './duration.pipe';

@NgModule({
  declarations: [TimePipe, DurationPipe],
  imports: [
    CommonModule
  ],
  exports: [TimePipe, DurationPipe]
})
export class CustomPipeModule { }
