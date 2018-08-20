import { Component, OnInit, Input } from '@angular/core';
import { StatusService } from './../services/status.service'; 
import { ContestService } from './../services/contest.service';
import { AuthorizationService } from '../services/authorization.service';
import { Angular2Csv } from 'angular2-csv';
@Component({
  selector: 'app-ranking-contest',
  templateUrl: './ranking-contest.component.html',
  styleUrls: ['./ranking-contest.component.css']
})
export class RankingContestComponent implements OnInit {
  @Input() contestId;
  constructor(
    private statusService: StatusService,
    private contestService: ContestService,
    private authorization: AuthorizationService,
    
  ) { }
  login: any;
  account: any;
  flag: boolean = false; 
  countProblems = [1,2,3,4,5,6,7,8];
  list: any;
  days: any;
  hours: any;
  minutes: any; 
  seconds: any;
  problems: any;
  contest: any;
  status$: any;
  problem$: any;
  ngOnInit() {
    this.login = sessionStorage.getItem('login');
    this.authorization.getAccountInfo().subscribe(res => this.account = res);
    this.fillList();
    this.getContest();
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
 hasAuthority(authority) {
  //console.log("AUTH ");
  if (!this.account) {
    return false;
  }
  
  return this.account.authorities.includes(authority);
}
  fillList(){
    this.status$ = this.statusService.getPositionContest(this.contestId).subscribe(
      data => { 
        this.list = data; 
        data.sort(this.predicateBy("accepteds", "totalTime"));
        data[0].data["String Task"];
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
  getContest() {
    this.contestService.getOneContest(this.contestId).subscribe(
      data => {
        this.contest = data;
        console.log('CONTEST ', this.contest);
        this.startTimer();
      }, 
      err => {
        console.log(err);
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

  getCsvOfContest() {
    console.log("LIST" , this.list);
    console.log("Download");
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      headers: ['User','Nombre', '#Problemas resueltos'],
      showTitle: true,
      title: this.contest.name,
      useBom: false,
      removeNewLines: true,
      keys: ['User','Nombre', '#Problemas resueltos']
    };
    let problems = [];
    for(let i of this.contest.problems) {
      options.headers.push(i.name);
      options.keys.push(i.name);
      problems.push(i.name);
    }
    let xx = [];
    for( let i of this.list ) {
      let p = {
        "User": i.username, 
        "Nombre": i.firstName + ' ' + i.lastName, 
        "#Problemas resueltos": i.accepteds
      };
      
      for( let j of problems) { 
        p[j] = i.data[j] ? i.data[j].veredict : '-';
      }
      // for(let j in i.data) {
      //   p[j] = i.data[j] ? i.data[j].veredict : '';
      // }
      console.log('ppppp', p);
      xx.push(p);
    }
    console.log(xx);
    new Angular2Csv(xx, 'Ranking', options);
  }
  startTimer() {
    let countDownDate = new Date(this.contest.enddate);
    console.log('Count', countDownDate);
    let countDownTime = countDownDate.getTime();
    setInterval(()=> {     
      let now = new Date().getTime();
      let distance = countDownTime - now;
      if(distance < 0 ) {
        this.days = 'Contest concluido';
      } else {
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
      // console.log(this.hours+':'+this.minutes+':'+this.seconds);
    }, 1000); 
  }
}
