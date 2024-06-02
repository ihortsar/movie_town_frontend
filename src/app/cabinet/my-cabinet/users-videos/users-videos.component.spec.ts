import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersVideosComponent } from './users-videos.component';

describe('UsersVideosComponent', () => {
  let component: UsersVideosComponent;
  let fixture: ComponentFixture<UsersVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
