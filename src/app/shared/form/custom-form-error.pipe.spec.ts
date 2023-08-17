import { CustomFormErrorPipe } from './custom-form-error.pipe';

describe('CustomFormErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomFormErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
