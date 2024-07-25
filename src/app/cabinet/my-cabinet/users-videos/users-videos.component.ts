import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-users-videos',
  standalone: true,
  imports: [NgStyle, NgFor, NgIf, FormsModule],
  templateUrl: './users-videos.component.html',
  styleUrls: ['./users-videos.component.scss', '../my-cabinet.component.scss']
})
export class UsersVideosComponent {
  noDescript = false
  environment = environment
  @Input() description: string = ''
  @Input() fileToUpload: File | null = null;
  @Output() backToMenu = new EventEmitter<string>();
  constructor(public us: UserService, private http: HttpClient) { }

  async addVideo() {
    const url = environment.baseUrl + '/video/';
    let options = this.createDataToSend()
    if (this.description !== '') {
      try {
        this.fileToUpload = null
        await lastValueFrom(this.http.post(url, options.formData, {
          headers: new HttpHeaders({
            'Authorization': options.headers['Authorization']
          })
        }));
        this.resetAddVideoButton()
        await this.us.updateUsersVideos()
      } catch (error) {
        console.error(error);
      }
    }
  }


  createDataToSend() {
    if (this.description == '') {
      this.noDescript = true
    }
    let formData = new FormData();
    if (this.fileToUpload && this.us.currentUser.id) {
      formData.append('title', this.fileToUpload.name || '');
      formData.append('description', this.description || '');
      formData.append('user', this.us.currentUser.id.toString());
      formData.append('video_file', this.fileToUpload);
    }
    let headers = {
      'Authorization': `token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
    let options = {
      headers: headers,
      formData: formData
    }
    return options
  }


  closeWindow(value: string) {
    this.backToMenu.emit(value)
  }


  resetAddVideoButton() {
    this.description = ''
    this.fileToUpload = null
  }


  retrieveFile(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files[0];
    } else {
      console.log(`No file selected`);
    }
  }


  async deleteVideo(videoId: number) {

    let url = this.environment.baseUrl + `/video/${this.us.currentUser.id}/${videoId}/`
    await lastValueFrom(this.http.delete(url, {
      headers: {
        'Authorization': `token ${localStorage.getItem('token')}`,
      }
    }))
    this.us.updateUsersVideos()
  }
}
