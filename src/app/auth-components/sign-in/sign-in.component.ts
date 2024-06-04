import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, NgForm, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterModule, HttpClientModule, MatInputModule, MatFormFieldModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})

export class SignInComponent implements OnInit, OnDestroy {
  forgotPassword = false
  email: string = '';
  password: string = '';
  token: string = '';
  userSubscription = new Subscription()
  signInForm: FormGroup
  
  constructor(private http: HttpClient, private router: Router, public us: UserService, private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      emailFormControl: ['', [Validators.required, Validators.email]],
      password: new FormControl('', Validators.required),

    });


  }

  ngOnInit(): void {
    this.userSubscription = this.us.currentUserSubject.subscribe(data => {
      if (data) {
        this.us.updateCurrentUser(data)
      }
    });

  }


  async signin() {
    const email = this.signInForm.get('email')?.value as string
    const password = this.signInForm.get('password')?.value as string
    try {
      await this.setToken()
      let user = (await this.us.getLoginResponse(email, password) as any).user;
      this.us.currentUserSubject.next(user);
      await this.us.updateUsersVideos()
      this.router.navigate(['/home']);
    } catch (er) {
      console.log('error occured:', er);

    }
  }





  async setToken() {
    const email = this.signInForm.get('email')?.value as string
    const password = this.signInForm.get('password')?.value as string
    let token = (await this.us.getLoginResponse(email, password) as any).token;
    localStorage.setItem('token', token);
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


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}