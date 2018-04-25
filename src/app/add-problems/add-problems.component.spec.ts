import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProblemsComponent } from './add-problems.component';

describe('AddProblemsComponent', () => {
  let component: AddProblemsComponent;
  let fixture: ComponentFixture<AddProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
