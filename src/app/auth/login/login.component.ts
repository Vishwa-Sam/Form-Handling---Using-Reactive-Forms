import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

// Creating custom validation this  can be created in the vaidators [] itself
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null
  } // must return null or nothing if the control or condistion is valid and control should be always passed as the paramter

  return { doesNotContainQuestionMark: true} // else an object is returned(must return an object) which has a key that is our choice better be descriptive of the condtion and should be true 
}

// creating async validator 
function isValidEmail(control: AbstractControl) {
  if (control.value !== "test@example.com") {
    return of(null) // this is for is the mail id doesn't contain the string we passed - valid if not passed the ame string
  }

  return of({ notUnique: true}) // if it contains the string we passed and invalid if equals "test@example.com"
}

//for getting the email input from local storage second method
let initialEmailValue = '' ;
const savedForm = window.localStorage.getItem('saved-login-form');
 if (savedForm) {
    const loadedForm = JSON.parse(savedForm)
    const savedFormData = loadedForm.email
    initialEmailValue = savedFormData;
  }

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, { //initialemail is set from empty string to the variable we declared before
      validators: [Validators.required , Validators.email],
      asyncValidators: [isValidEmail]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark
    //     (control: AbstractControl) => {
    //   if (control.value?.includes('?')) {
    //     return null;
    //   }
    //   return { doesNotContainQuestionMark: true };
    // } inside here or separate function
      ] 
    })
  })

  get isValidEmail() {
    return (
      this.form.controls.email.invalid && 
      this.form.controls.email.dirty && 
      this.form.controls.email.touched );
  }

   get isValidPassword() {
    return (
      this.form.controls.password.invalid && 
      this.form.controls.password.dirty && 
      this.form.controls.password.touched );
  } 

  ngOnInit() { //we use onInit here cuz the form is handled and created in the ts files so rendering of the template is not necessary also the form will be initialised once the componet is initialsed as we are doing it in ts code
    
      // const savedForm = window.localStorage.getItem('saved-login-form');

      // if (savedForm) {
      //   const loadedForm = JSON.parse(savedForm)
      //   const savedFormData = loadedForm.email
      //   this.form.patchValue({
      //     email: savedFormData
      //   });
      // }
      const subscription = this.form.valueChanges.subscribe({
        next: value => {
          window.localStorage.setItem('saved-login-form', JSON.stringify({
            email: value.email
          }));
        },
      })
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form)
    const enteredEmail = this.form.value.email ;
    const enteredPassword = this.form.value.password ;
    console.log(enteredEmail, enteredPassword);
  }
}
