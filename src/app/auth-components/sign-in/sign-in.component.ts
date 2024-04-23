import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, NgModel, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  forgotPasswordForm: SafeHtml | null = null;
  forgotPassword = false
  email: string = '';
  password: string = '';
  uid: string = '';
  token: string = '';
  resetLink: string = '';
  emailSent = false
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, public us: UserService) {
  }
  ngOnInit(): void {
    this.us.currentUserSubject.subscribe(data => {
      localStorage.setItem('currentUser', JSON.stringify(data))
    })
  }



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
 * Retrieves current users data from the signup form.
 * @returns User data entered in the signup form
 */
  async getCurrentUser(body: any) {
    let url = environment.baseUrl + '/current_user/'
    let response = await lastValueFrom(this.http.post(url, body))
    let user =
    {
      userId: body.user_id,
      userData: response
    }
    this.us.currentUserSubject.next(user)

  }


  /**
  * Retrieves user data from the signup form.
  * @returns User data entered in the signup form
  */
  getUsersData() {
    const email = this.signInForm.get('email')?.value as string
    const password = this.signInForm.get('password')?.value as string

    return { email, password }
  }


  async signin() {
    try {
      let url = environment.baseUrl + '/login/'
      let body = this.getUsersData()
      let response = await lastValueFrom(this.http.post(url, body))
      let token = (response as any).token;
      localStorage.setItem('token', token);
      console.log('response:', response);
      await this.getCurrentUser(response)

    } catch (er) {
      console.log('error occured:', er);

    }
  }


  sendMail(f: NgForm) {
    let url = environment.baseUrl + '/reset-password/';
    this.http.post(url, { email: f.value })
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });

  }


  toggleForgotPassword() {
    this.forgotPassword = !this.forgotPassword

  }



}