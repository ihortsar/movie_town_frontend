import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { FormsModule } from '@angular/forms';
import { UsersVideosComponent } from './users-videos/users-videos.component';
import { UsersMoviesComponent } from './users-movies/users-movies.component';
@Component({
  selector: 'app-my-cabinet',
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, EditProfileComponent, FormsModule, UsersVideosComponent, UsersMoviesComponent],
  templateUrl: './my-cabinet.component.html',
  styleUrl: './my-cabinet.component.scss'
})
export class MyCabinetComponent implements OnInit, OnDestroy {
  selectedMovies: {}[] = []
  editProfile = false
  userSubscription: Subscription = new Subscription();
  usersVideosSubscription: Subscription = new Subscription();
  environment = environment
  fileToUpload: File | null = null;
  description: string = ''

  constructor(public us: UserService) { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  ngOnInit() {
    this.userSubscription = this.us.currentUserSubject.subscribe(data => {
      this.us.updateCurrentUser(data)
    })
    this.us.updateUsersVideos()
    this.usersVideosSubscription = this.us.usersVideosSubject.subscribe((data: any) => {
      this.us.usersVideos = data
    })
  }


  openEditProfile() {
    this.editProfile = true
  }


  closeEditProfile(value: boolean) {
    this.editProfile = value
  }


  toggleMenu(element: string) {
    const appUsersVideosElement = document.querySelector(element) as HTMLElement;
    const secondContainer = document.querySelector('.second-container') as HTMLElement;
    appUsersVideosElement.style.display = 'block';
    secondContainer.style.display = 'none';
  }


  backToMenu(value: any, element: string) {
    const appElement = document.querySelector(element) as HTMLElement;
    const secondContainer = document.querySelector('.second-container') as HTMLElement;
    appElement.style.display = 'none';
    secondContainer.style.display = value;
  }



}





