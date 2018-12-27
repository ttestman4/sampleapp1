import { DurationPipe } from './duration.pipe';
import { Time } from '@angular/common';

describe('DurationPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('valid duration value', () => {
    const pipe = new DurationPipe();
    const input: Time = { hours: 10, minutes: 12 };
    const output = '10h 12m';
    expect(pipe.transform(input)).toEqual(output);
  });
});
