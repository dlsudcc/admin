import { NullablePipe } from './nullable.pipe';

describe('NullablePipe', () => {
  it('create an instance', () => {
    const pipe = new NullablePipe();
    expect(pipe).toBeTruthy();
  });
});
