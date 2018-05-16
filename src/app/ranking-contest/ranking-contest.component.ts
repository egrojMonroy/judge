import { Component, OnInit, Input } from '@angular/core';
import { StatusService } from './../services/status.service'; 
import { ContestService } from './../services/contest.service';
@Component({
  selector: 'app-ranking-contest',
  templateUrl: './ranking-contest.component.html',
  styleUrls: ['./ranking-contest.component.css']
})
export class RankingContestComponent implements OnInit {
  @Input() contestId;
  constructor(
    private statusService: StatusService,
    private contestService: ContestService
  ) { }
  countProblems = [1,2,3,4,5,6,7,8];
  list: any;
  problems: any;
  ngOnInit() {
    this.fillList();
    this.fillProblems();
  }
  predicateBy(prop,propb){
    return function(a,b){
       if( a[prop] < b[prop]){
           return 1;
       }else if( a[prop] > b[prop] ){
           return -1;
       } else if (a[prop] == b[prop]) {
         if(a[propb] > b[propb]){
           return 1; 
         } else if(a[propb] < b[propb]) {
           return -1;
         }
       }
       return 0;
    }
 }
  fillList(){
    this.statusService.getPositionContest(this.contestId).subscribe(
      data => { 
        console.log("WORKS ",data);
        this.list = data; 
        console.log(this.list);
        console.log(data.sort(this.predicateBy("accepteds", "totalTime")));
      }
    );
  }
  fillProblems(){
    this.contestService.getProblems(this.contestId).subscribe(
      data => {
        console.log("Problems ",data);
        this.problems = data;
      }
    );
  }

}
