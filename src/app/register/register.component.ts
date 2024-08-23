import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SessionManagementService } from '../session-management/session-management.service';

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
  private sessionManagementService = inject(SessionManagementService);
  messageSuccess = '';
  messageFailure = '';
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
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
      this.messageFailure = 'Form is Invalid';
      this.messageSuccess = '';
      return;
    }
    this.sessionManagementService
      .registerUser(
        this.form.value.username as string,
        this.form.value.email as string,
        this.form.value.passwords!.password as string,
        this.form.value.passwords!.confirmPassword as string
      )
      .subscribe({
        next: (response) => {
          this.messageFailure = '';
          this.messageSuccess = 'User has been registered. Check your email';
          // Handle success (201)
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.messageFailure = 'Validation for user failed. Check your form';
            this.messageSuccess = '';
          } else if (error.status === 409) {
            this.messageFailure =
              'User with such username/email already exists. Try different input';
            this.messageSuccess = '';
          } else {
            // Handle server errors
            this.messageFailure =
              'An unexpected error occurred. Contact Administrator';
            this.messageSuccess = '';
          }
        },
      });
  }
}
