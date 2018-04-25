import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingContestComponent } from './ranking-contest.component';

describe('RankingContestComponent', () => {
  let component: RankingContestComponent;
  let fixture: ComponentFixture<RankingContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
