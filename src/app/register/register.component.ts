import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }
    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form = new FormGroup({
    identifiers: new FormGroup({
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern('(.*[0-9].*)'),
          ],
        }),
        confirmPassword: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern('(.*[0-9].*)'),
          ],
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    const enteredEmail = this.form.value.identifiers!.email;
    const enteredUsername = this.form.value.identifiers!.username;
    const enteredPassword = this.form.value.passwords!.password;
    const enteredConfirmPassword = this.form.value.passwords!.confirmPassword;
    console.log(
      enteredEmail,
      enteredUsername,
      enteredPassword,
      enteredConfirmPassword
    );
  }
}
