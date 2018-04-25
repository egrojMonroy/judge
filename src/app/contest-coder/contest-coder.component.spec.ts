import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestCoderComponent } from './contest-coder.component';

describe('ContestCoderComponent', () => {
  let component: ContestCoderComponent;
  let fixture: ComponentFixture<ContestCoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestCoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestCoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
