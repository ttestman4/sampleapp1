import { formatNumber, Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Time): string {
    const isAM = value.hours < 12 ? true : false;
    return (isAM === true ? value.hours : ((value.hours - 12) === 0 ? 12 : (value.hours - 12))) +
      ':' +
      formatNumber(value.minutes, 'en-US', '2.0-0') +
      ' ' +
      (isAM === true ? 'AM' : 'PM');
  }

}
