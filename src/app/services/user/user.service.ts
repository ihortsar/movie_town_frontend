import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from '../../classes/user.class';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '../../interfaces/user.interface';
import { Movie } from '../../interfaces/movie.interface';
import { Video } from '../../interfaces/video.interface';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  signoutRequest: boolean = false

  currentUserSubject
  currentUser: IUser = {
    first_name: '',
    last_name: '',
    birthday: '',
    email: '',
    password1: '',
    password2: '',
    selected_movies: []
  }
  usersVideos: Video[] = []
  usersVideosSubject

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
    const localStorage = document.defaultView?.localStorage;
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage?.getItem('currentUser') || '{}')),
      this.usersVideosSubject = new BehaviorSubject<Video[]>([])


  }

  async getLoginResponse(email: string, password: string) {
    let url = environment.baseUrl + '/login/'
    let body = {
      email,
      password
    }
    let response = await lastValueFrom(this.http.post(url, body))
    return response
  }



  updateCurrentUser(data: any): void {
    if (data) {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUser = data
    }
  }


  async updateUsersVideos() {
    const videosUrl = environment.baseUrl + `/video/${this.currentUser.id}`
    try {
      const updatedVideos = await lastValueFrom(this.http.get<Video[]>(videosUrl, {
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      }))
      if (updatedVideos && updatedVideos.length > 0) {
        this.usersVideosSubject.next(updatedVideos)
      } else {
        this.usersVideosSubject.next([])
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      this.usersVideosSubject.next([]);
    }
  }



  async sendUserToBackend(body: any) {
    let url = environment.baseUrl + '/current_user/'
    let response: any = await lastValueFrom(this.http.put(url, body))
    this.currentUserSubject.next(response)

  }


  checkIfAdded(currentMovie: Movie): number {
    let index: number = -1;
    if (this.currentUser && this.currentUser.selected_movies && this.currentUser.selected_movies.length > 0) {
      index = this.currentUser.selected_movies.findIndex((movie: Movie) => movie.id === currentMovie.id);
    }
    return index;
  }

}
