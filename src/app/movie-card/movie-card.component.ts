import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgIf, HttpClientModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  addedToFavorites = false
  constructor(@Inject(MAT_DIALOG_DATA) public movie: any, private us: UserService, public http: HttpClient,) { }
  ngOnInit(): void {
    this.toggleAddedToFavorites()
  }



  toggleAddedToFavorites() {
    const index = this.us.checkIfAdded(this.movie);
    this.addedToFavorites = index !== -1;
  }


  addOrDeleteMovieFromSelected(movie: {},) {
    const url = environment.baseUrl + '/current_user/'


    this.us.currentUser.selected_movies = this.us.currentUser.selected_movies || []
    if (this.us.checkIfAdded(this.movie) === -1) {
      this.us.currentUser.selected_movies.push(movie)
    } else {
      this.us.currentUser.selected_movies.splice(this.us.checkIfAdded(this.movie), 1)
    }
    this.toggleAddedToFavorites()

    this.us.currentUserSubject.next(this.us.currentUser)
    const body = {
      id: this.us.currentUser.id,
      selected_movies: this.us.currentUser.selected_movies
    }
    lastValueFrom(this.http.put(url, body))
  }


}
