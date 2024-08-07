import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterModule, HttpClientModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy {
  forgotPassword = false
  email: string = '';
  password: string = '';
  token: string = '';
  userSubscription = new Subscription()
  invalidData: string = ''
  constructor(private http: HttpClient, private router: Router, public us: UserService) {
  }

  /**
  * Angular lifecycle hook that is called after data-bound properties are initialized.
  * Subscribes to the current user observable.
  */
  ngOnInit(): void {
    this.userSubscription = this.us.currentUserSubject.subscribe(data => {
      if (data) {
        this.us.updateCurrentUser(data)
      }
    });
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);


  /**
   * Handles the sign-in process by authenticating the user and updating their data.
   * Navigates to the home page upon successful sign-in.
   */
  async signin() {
    const email = this.emailFormControl.value as string
    const password = this.passwordFormControl.value as string
    try {
      let user = (await this.us.getLoginResponse(email, password) as any).user;
      this.us.currentUserSubject.next(user);
      await this.us.updateUsersVideos()
      await this.setToken()
      this.router.navigate(['/home']);
    } catch (er: any) {
      this.invalidData = er?.error?.error || 'An unknown error occurred';
    }
  }

  /**
     * Sets the authentication token in local storage.
     */
  async setToken() {
    const email = this.emailFormControl.value as string
    const password = this.passwordFormControl.value as string
    let token = (await this.us.getLoginResponse(email, password) as any).token;
    localStorage.setItem('token', token);
  }


  /**
   * Sends a password reset request email to the provided address.
   * @param f - NgForm object containing the email for password reset.
   */
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


  /**
  * Angular lifecycle hook that is called when the component is destroyed.
  * Unsubscribes from the user subscription to prevent memory leaks.
  */
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}