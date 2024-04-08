import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  constructor() { }

  /**
* FormGroup for user signup form.
* Contains form controls for username, first name, last name, email and password.
*/
  signInForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }
  )


  /**
 * Retrieves user data from the signup form.
 * @returns User data entered in the signup form
 */
  getUsersData() {
    const email = this.signInForm.get('email')?.value as string
    const password = this.signInForm.get('password')?.value as string
    console.log(email, password);

    return { email, password }
  }
}