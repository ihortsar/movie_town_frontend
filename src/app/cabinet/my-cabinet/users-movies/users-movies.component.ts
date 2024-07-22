import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../../../movie-card/movie-card.component';

@Component({
  selector: 'app-users-movies',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './users-movies.component.html',
  styleUrls: ['./users-movies.component.scss', '../my-cabinet.component.scss']
})
export class UsersMoviesComponent {
  @Output() backToMenu = new EventEmitter<string>();

  constructor(public us: UserService, public dialog: MatDialog) { }

  openDialog(movie: {}) {
    const dialogRef = this.dialog.open(MovieCardComponent, {
      panelClass: 'dialog-custom',
      data: movie
    });

  }


  closeWindow(value: string) {
    this.backToMenu.emit(value)
  }
}
