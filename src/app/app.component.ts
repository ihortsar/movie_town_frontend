import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie_town_frontend';

  constructor(public router: Router) { }
}
