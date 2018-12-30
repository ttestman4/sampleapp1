import { TimePipe } from './time.pipe';
import { Time } from '@angular/common';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });

  it('valid AM value', () => {
    const pipe = new TimePipe();
    const input: Time = { hours: 10, minutes: 12 };
    const output = '10:12 AM';
    expect(pipe.transform(input)).toEqual(output);
  });

  it('valid PM value', () => {
    const pipe = new TimePipe();
    const input: Time = { hours: 22, minutes: 12 };
    const output = '10:12 PM';
    expect(pipe.transform(input)).toEqual(output);
  });

  it('valid PM value', () => {
    const pipe = new TimePipe();
    const input: Time = { hours: 12, minutes: 12 };
    const output = '12:12 PM';
    expect(pipe.transform(input)).toEqual(output);
  });

  it('valid AM value', () => {
    const pipe = new TimePipe();
    const input: Time = { hours: 5, minutes: 0 };
    const output = '5:00 AM';
    expect(pipe.transform(input)).toEqual(output);
  });
});
