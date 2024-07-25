import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { SignOutComponent } from './auth-components/sign-out/sign-out.component';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, CommonModule, RouterOutlet, RouterModule, LoaderComponent, SignOutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {


  title = 'movie_town_frontend';
  constructor(public router: Router, public us: UserService) {
  }
 

  handleSignoutRequest() {
    this.us.signoutRequest = !this.us.signoutRequest
  }

}
