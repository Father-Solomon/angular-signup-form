import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  console.log('passwordMatchesValidator', password && confirmPassword && password === confirmPassword ? null : { passwordMatch: true })
  return password && confirmPassword && password === confirmPassword ? {passwordMatch: false} : { passwordMatch: true };
};
