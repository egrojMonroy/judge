import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestCasesComponent } from './add-test-cases.component';

describe('AddTestCasesComponent', () => {
  let component: AddTestCasesComponent;
  let fixture: ComponentFixture<AddTestCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
