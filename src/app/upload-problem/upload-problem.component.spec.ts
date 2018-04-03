import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProblemComponent } from './upload-problem.component';

describe('UploadProblemComponent', () => {
  let component: UploadProblemComponent;
  let fixture: ComponentFixture<UploadProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
