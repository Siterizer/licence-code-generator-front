import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
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
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(
          '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
        ),
      ],
    }),
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
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
        confirmPassword: new FormControl('', {}),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
  });

  onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    const enteredEmail = this.form.value.email;
    const enteredUsername = this.form.value.username;
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
