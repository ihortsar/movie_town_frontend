import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../../movie-card/movie-card.component';

@Component({
  selector: 'app-my-cabinet',
  standalone: true,
  imports: [NgIf, NgFor, EditProfileComponent],
  templateUrl: './my-cabinet.component.html',
  styleUrl: './my-cabinet.component.scss'
})
export class MyCabinetComponent implements OnInit, OnDestroy {


  selectedMovies: {}[] = []
  editProfile = false
  userSubscription: Subscription = new Subscription();
  usersVideosSubscription: Subscription = new Subscription();
  environment = environment
  constructor(public us: UserService, public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  ngOnInit() {
    this.userSubscription = this.us.currentUserSubject.subscribe(data => {
      this.us.updateCurrentUser(data)
    })
    this.usersVideosSubscription = this.us.usersVideosSubject.subscribe((data: any) => {
      this.us.usersVideos = data
    })
    console.log(this.us.currentUser.selected_movies);

  }

  openEditProfile() {
    this.editProfile = true
  }


  closeEditProfile(value: boolean) {
    this.editProfile = value
  }


  openDialog(movie: {}) {
    const dialogRef = this.dialog.open(MovieCardComponent, {
      width: '40%',
      height: '100%',
      data: movie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
