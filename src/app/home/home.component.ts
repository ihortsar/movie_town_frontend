import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  genres: any[] = []
  moviesOfGenrex: any[] = [];
  url = `https://api.themoviedb.org/3/discover/movie`;

  constructor(public http: HttpClient, private us: UserService) { }

  async ngOnInit() {
    await this.fetchAllGenres()
    this.us.currentUserSubject.subscribe(data => {
      this.us.setCurrentUser(data)
    })
  };


  async fetchAllGenres() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2M2NDkwMTFiYWU2NWRiZTQxYjk3ZTZlNDMzNmVjMiIsInN1YiI6IjY2MTRmYWE5ZTEwZjQ2MDFhNDNhYzIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.slr3WJODoHJ6unkd7Kr6ajNlpH4ZC8wlTkeUvQTBn84'
      }
    }

    let response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options)
    let responseAsJson = await response.json()
    for (let i = 0; i < responseAsJson.genres.length; i++) {
      await this.fetchMoviesByGenre(responseAsJson.genres[i], options)
    }
  }

  async fetchMoviesByGenre(genre: any, options: any) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=en`, options);
      const responseAsJson = await response.json();
      this.genres.push(
        {
          name: genre.name,
          movies: responseAsJson.results
        }
      )
    } catch (error) {
      console.error(`Error fetching movies for genre ${genre.id}:`, error);
    }
  };


  addOrDeleteMovieFromSelected(movie: {},) {

    /*let body = {
      movie: movie,
      user_id: this.us.currentUser.userId
    }
    let url = environment.baseUrl + '/movie_select/'
    let response = lastValueFrom(this.http.post(url, body)) */
    this.us.currentUser.selectedMovies = this.us.currentUser.selectedMovies || []
    this.us.currentUser.selectedMovies.push(movie)
    this.us.currentUserSubject.next(this.us.currentUser)
    console.log(this.us.currentUser);

  }

}
