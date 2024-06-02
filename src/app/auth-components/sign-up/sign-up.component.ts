import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';
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



@Component({
  selector: 'app-sign-up',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgIf, HttpClientModule, MatSlideToggleModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss',]
})
export class SignUpComponent {
  constructor(private http: HttpClient) { }

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
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }
  )



  createUser() {
    const date = this.signUpForm.get('birthday')?.value as string | undefined;
    const birthday = date ? new DatePipe('en-US').transform(date, 'yyyy-MM-dd')?.toString() : '';
    let user = new User({
      email: this.signUpForm.get('email')?.value as string,
      password1: this.signUpForm.get('password1')?.value as string,
      password2: this.signUpForm.get('password2')?.value as string,
      first_name: this.signUpForm.get('firstName')?.value as string,
      last_name: this.signUpForm.get('lastName')?.value as string,
      birthday: birthday || ''
    })
    this.signUp(user)
  }


  async signUp(body: User) {
    let options = {
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      let url = environment.baseUrl + '/signup/'
      await lastValueFrom(this.http.post(url, options))
    } catch (er) {
      console.log(er);

    }
  }
}
