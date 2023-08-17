import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'customFormError'
})
export class CustomFormErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | null {
    if (errors) {
      if (errors['required']) return 'This field is required and cannot be empty';
      if (errors['email']) return 'This is not a valid email address';
      if (errors['min']) return 'This number is too small';
      if (errors['max']) return 'This number is too large';
      if (errors['minlength']) return 'This field is too short';
      if (errors['maxlength']) return 'This field is too long';
      if (errors['pattern']) return 'This field does not fit the pattern';
      if (errors['gt100']) return 'This number should be bigger than 100';
      if (errors['requireMatch']) return 'This field must match with the options';
    }
    return null;
  }
}
