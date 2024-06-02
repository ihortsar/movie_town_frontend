import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Subscription, lastValueFrom } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { Genre } from '../interfaces/genre.interface';
import { Movie } from '../interfaces/movie.interface';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  result = ''
  genres: Genre[] = []
  url = `https://api.themoviedb.org/3/discover/movie`;
  subscription: Subscription = new Subscription();
  filteredMovies: Movie[] = []

  constructor(public http: HttpClient, private us: UserService, public dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


  async ngOnInit() {
    await this.fetchAllGenres()
    this.subscription = this.us.currentUserSubject.subscribe(data => {
      this.us.updateCurrentUser(data)
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

  async fetchMoviesByGenre(genre: Genre, options: any) {
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

  filterMovies() {
    this.filteredMovies = [];

    if (this.result.length > 2) {
      const searchTerm = this.result.toLowerCase();
      const addedMovieIds = new Set<number>();

      this.genres.forEach((genre: Genre) => {
        genre.movies.forEach((movie: Movie) => {
          if (movie.title.toLowerCase().includes(searchTerm) && !addedMovieIds.has(movie.id)) {
            this.filteredMovies.push(movie);
            addedMovieIds.add(movie.id);
          }
        });
      });
    }
  }


}
