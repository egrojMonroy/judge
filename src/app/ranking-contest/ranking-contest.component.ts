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
  status$: any;
  problem$: any;
  ngOnInit() {
    this.fillList();
    this.fillProblems();
  }
  ngOnDestroy(){
    if( this.status$ ){
      this.status$.unsubscribe();
    }
    if(this.problem$) {
      this.problem$.unsubscribe();
    }
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
    this.status$ = this.statusService.getPositionContest(this.contestId).subscribe(
      data => { 
        this.list = data; 
        console.log(data.sort(this.predicateBy("accepteds", "totalTime")));
        console.log(data[0].data["String Task"]);
      }
    );
  }
  fillProblems(){
    this.problem$ = this.contestService.getProblems(this.contestId, 0, 100).subscribe(
      data => {
        console.log("Problems ",data);
        this.problems = data;
      }
    );
  }
  getBooleanAC(a){
    if(a) return a.veredict == "ACCEPTED";
    return false;
  }

  getBooleanWA(a){
    if(a) return a.veredict != "ACCEPTED";
    return false;
  }
}
