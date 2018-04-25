import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-contest',
  templateUrl: './ranking-contest.component.html',
  styleUrls: ['./ranking-contest.component.css']
})
export class RankingContestComponent implements OnInit {

  constructor() { }
  countProblems = [1,2,3,4,5,6,7,8];
  ngOnInit() {
  }

}
