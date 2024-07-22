import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { SignOutComponent } from './auth-components/sign-out/sign-out.component';
import { UserService } from './services/user/user.service';
import { CsrfService } from './services/csrf.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, CommonModule, RouterOutlet, RouterModule, LoaderComponent, SignOutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {


  title = 'movie_town_frontend';
  constructor(public router: Router, public us: UserService) {
  }
  ngOnInit() {
    fetch('https://movie-town.ihor-tsarkov.com/api/get-csrf-token/', {
      method: 'GET',
      credentials: 'include'  // Include credentials (cookies)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);  // Should log: {detail: "CSRF cookie set"}
  })
  .catch(error => {
      console.error('Error:', error);
  });
  }


  handleSignoutRequest() {
    this.us.signoutRequest = !this.us.signoutRequest
  }

}
