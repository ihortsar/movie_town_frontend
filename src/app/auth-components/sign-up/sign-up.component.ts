import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { NgFor, NgIf, NgStyle } from '@angular/common';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatSlideToggleModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss',]
})
export class SignUpComponent {

  /**
* FormGroup for user signup form.
* Contains form controls for username, first name, last name, email and password.
*/
  signUpForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),

    }
  )


  /**
  * Retrieves user data from the signup form.
  * @returns User data entered in the signup form
  */
  getUsersData() {
    const email = this.signUpForm.get('email')?.value as string
    const password = this.signUpForm.get('password')?.value as string
    console.log(email, password);

    return { email, password }
  }
}
