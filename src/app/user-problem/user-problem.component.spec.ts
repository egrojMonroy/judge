import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProblemComponent } from './user-problem.component';

describe('UserProblemComponent', () => {
  let component: UserProblemComponent;
  let fixture: ComponentFixture<UserProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
