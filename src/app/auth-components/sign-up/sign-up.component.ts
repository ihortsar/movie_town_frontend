import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { User } from '../../classes/user.class';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [NgStyle, MatFormFieldModule, MatInputModule, NgFor, NgIf, HttpClientModule, MatSlideToggleModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatFormFieldModule,],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss',]
})
export class SignUpComponent implements OnInit {
  maxDate: Date | undefined
  passErrors: string[] = []
  mailErrors: string[] = []
  constructor(private http: HttpClient, private router: Router) { }

  /**
     * Angular lifecycle hook that is called after the component's data-bound properties have been initialized.
     * Initializes `maxDate` to the current date.
     */
  ngOnInit() {
    this.maxDate = new Date();
  }

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
      password1: new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }
  )


  /**
   * Extracts user values from the form and creates a `User` object.
   * @returns A `User` object if the form is valid, otherwise `undefined`.
   */
  usersValues() {
    if (this.signUpForm.valid) {
      const date = this.signUpForm.get('birthday')?.value as string | undefined;
      const birthday = date ? new DatePipe('en-GB').transform(date, 'yyyy-MM-dd')?.toString() : '';
      let user = new User({
        email: this.signUpForm.get('email')?.value as string,
        password1: this.signUpForm.get('password1')?.value as string,
        password2: this.signUpForm.get('password2')?.value as string,
        first_name: this.signUpForm.get('firstName')?.value as string,
        last_name: this.signUpForm.get('lastName')?.value as string,
        birthday: birthday || ''
      })
      return user
    }
    return undefined
  }


  /**
  * Handles the user creation process.
  * - Validates the form and extracts user values.
  * - Calls the `signUp` method to send user data to the server.
  * - Catches and logs any errors during the sign-up process.
  */
  async createUser() {
    let user = this.usersValues()
    if (user) {
      try {
        await this.signUp(user)
      } catch (error: any) {
        console.log(error);
      }
    }
  }


  /**
 * Sends a sign-up request to the server with the provided user data.
 * - Clears any previous errors before making the request.
 * - Posts the user data to the server and navigates to the home page upon success.
 * - Handles and processes errors related to password and email fields.
 * @param body - The `User` object containing user data.
 */
  async signUp(body: User) {
    this.clearErrors()
    let options = {
      data: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      let url = environment.baseUrl + '/signup/'
      await lastValueFrom(this.http.post(url, options))
      this.router.navigate(['/home']);
    } catch (er: any) {
      if (er.error.password2) {
        this.handleErrors(er)
      }
    }
  }


  clearErrors() {
    this.passErrors = []
    this.mailErrors = []
  }


  /**
  * Handles and processes error messages related to password and email fields.
  * - Populates `passErrors` with password-related errors.
  * - Populates `mailErrors` with email-related errors.
  * @param er - The error response object containing error details.
  */
  handleErrors(er: any) {
    if (er?.error?.password2 && Array.isArray(er.error.password2)) {
      er.error.password2.forEach((er: any) => {
        this.passErrors.push(er)
      })
    }
    if (er?.error?.email && Array.isArray(er.error.email)) {
      er.error.email.forEach((er: any) => {
        this.mailErrors.push(er)
      })
    }
  }

}