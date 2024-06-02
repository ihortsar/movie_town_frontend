import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss'
})
export class SignOutComponent {
  constructor(private us: UserService, private router: Router) { }

  signout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.us.currentUserSubject.next({})
    this.router.navigate(['/login']);
    this.us.signoutRequest = false
  }
}
