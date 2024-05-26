import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Subscription, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NgIf, HttpClientModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  editName = false
  editForm: any
  formPassword: any
  editEmail = false
  editPassword = false
  subscription: Subscription = new Subscription();
  @Output() closeEdit = new EventEmitter<boolean>();
  showOld = false
  showNew = false
  constructor(public us: UserService, private http: HttpClient, private elementRef: ElementRef) {

  }



  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.us.currentUser.first_name + ' ' + this.us.currentUser.last_name),
      email: new FormControl(this.us.currentUser.email)
    });
    this.formPassword = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    })
    this.subscription = this.us.currentUserSubject.subscribe(data => {
      this.us.updateCurrentUser(data)
    })
  }


  ngAfterViewInit(): void {
    const container = this.elementRef.nativeElement.querySelector('.container');
    container.addEventListener('click', (event: any) => {
      const formProfile = this.elementRef.nativeElement.querySelector('#formProfile');
      const formPassword = this.elementRef.nativeElement.querySelector('#formPasswords');
      setTimeout(() => {
        if ((!this.editPassword && formProfile && !formProfile.contains(event.target)) ||
          (this.editPassword && formPassword && !formPassword.contains(event.target))) {
          this.closeEdit.emit(false);
        }
      });
    }, 100)
  }







  toggleEditName() {
    this.editName = !this.editName
  }


  toggleEditEmail() {
    this.editEmail = !this.editEmail
  }


  saveEditedUser() {
    let body
    if (!this.editPassword) {
      body = {
        id: this.us.currentUser.id,
        first_name: this.editForm.get('name').value.split(' ')[0],
        last_name: this.editForm.get('name').value.split(' ')[1],
        email: this.editForm.get('email').value,
      }
    } else {
      body = {
        id: this.us.currentUser.id,
        old_password: this.formPassword.get('oldPassword').value,
        new_password: this.formPassword.get('newPassword').value
      }
    }
    this.saveAndClose(body)
  }


  saveAndClose(body: any) {
    this.us.sendUserToBackend(body)
    this.closeEdit.emit(false);
  }



  toggleEditPassword() {
    this.editPassword = !this.editPassword
  }


  toggleShowOld() {
    this.showOld = !this.showOld
  }


  toggleShowNew() {
    this.showNew = !this.showNew
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
