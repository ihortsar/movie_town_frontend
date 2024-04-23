import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserSubject
  currentUser: any = {}
  constructor() {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'))

  }

  setCurrentUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

}
