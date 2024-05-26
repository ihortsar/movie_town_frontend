import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from '../../classes/user.class';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  currentUserSubject
  currentUser: any
  usersVideos: {
    created_at: string,
    title: string,
    description: string,
    video_file: string
  }[] = []
  usersVideosSubject
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}')),
      this.usersVideosSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('usersVideos') || '[]'))

  }

  updateCurrentUser(data: any): void {
    if (data) {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUser = data
    }
  }


  updateUsersVideos(data: any) {
    if (data) {
      localStorage.setItem('usersVideos', JSON.stringify(data));
      this.usersVideos = data
    }
  }


  async sendUserToBackend(body: any) {
    let url = environment.baseUrl + '/current_user/'
    let response: any = await lastValueFrom(this.http.put(url, body))
    this.currentUserSubject.next(response)

  }


  checkIfAdded(currentMovie: any): number {
    let index
    if (this.currentUser && this.currentUser.selected_movies.length >= 0) {
      index = this.currentUser.selected_movies.findIndex((movie: any) => movie.id === currentMovie.id);
    }
    return index
  }

}
