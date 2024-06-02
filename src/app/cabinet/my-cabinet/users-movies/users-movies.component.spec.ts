import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMoviesComponent } from './users-movies.component';

describe('UsersMoviesComponent', () => {
  let component: UsersMoviesComponent;
  let fixture: ComponentFixture<UsersMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
