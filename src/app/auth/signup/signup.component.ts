import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalInputs(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(controlName1)?.value ;
    const value2 = control.get(controlName2)?.value ;

    if (value1 === value2) {
      return null;
    }
    return { notEqualInputs: true }
  }
} //for paswwords

function notEqualInputs(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(controlName1)?.value ;
    const value2 = control.get(controlName2)?.value ;

    if (value1 !== value2) {
      return null;
    }
    return { EqualInputs: true }
  }
} //for names 
 
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup ({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),

    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
    }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
  }),
    },{
      validators: [equalInputs('password', 'confirmPassword')]
    }),

    names: new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
    },{
      validators: [notEqualInputs('firstName', 'lastName')]
    }),

    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),

    role: new FormControl<'student'| 'teacher' | 'employee' | 'founder' | 'other'>('student', { validators: [Validators.required] }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    agree: new FormControl(false, { validators: [Validators.required]})
  })

  // get isValidEmail() {
  //   return(
  //     this.form.controls.email.invalid && 
  //     this.form.controls.email.dirty &&
  //     this.form.controls.email.touched
  //   );
  // }

  // get isValidPassword() {
  //   return(
  //     this.form.controls.password.invalid && 
  //     this.form.controls.password.dirty &&
  //     this.form.controls.password.touched
  //   );
  // }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
