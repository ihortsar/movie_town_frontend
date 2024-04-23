import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-my-cabinet',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './my-cabinet.component.html',
  styleUrl: './my-cabinet.component.scss'
})
export class MyCabinetComponent implements OnInit {

  selectedMovies: {}[] = []

  constructor(public us: UserService,) { }
  ngOnInit() {
    this.us.currentUserSubject.subscribe(data => {
      this.us.setCurrentUser(data)
    })
  }

  getSelectedMovies() {

  }

}
