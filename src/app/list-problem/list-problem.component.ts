import { Component, OnInit, Input } from '@angular/core';
import { UploadProblemService } from './../services/upload-problem.service'; 
import { ContestService } from './../services/contest.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

@Component({
  selector: 'app-list-problem',
  templateUrl: './list-problem.component.html',
  styleUrls: ['./list-problem.component.css']
})
export class ListProblemComponent implements OnInit {

  constructor(
    private uploadProblemService: UploadProblemService,
    private contestService: ContestService    
  ) { 
    this.itemsPerPage = 10;
  }
  list:any;
  @Input() contestView: boolean;
  @Input() contestId;
  contest: any;
  currentPage=0;
  totalItems: number;
  itemsPerPage: number; 
  days: any;
  hours: any;
  minutes: any;
  seconds: any; 
  ngOnInit() {
    console.log("LLEGA QUE ",this.contestView, this.contestId);
    if(this.contestView) { 
      this.fillListContest();
      this.getContest();
      this.startTimer();
    } else {
      this.fillList();  
    }
  
    
  }
  fillListContest() {
    this.contestService.getProblems(this.contestId, this.currentPage -1, this.itemsPerPage).subscribe(
      data=>{
        console.log('List ', data);
        this.contestService.getTotalItemsContest(this.contestId).subscribe(
          d => {
            this.totalItems = d;
          }
        );
        this.list = data;
      },
      err => {
        console.log('Error', err);
      }
    );
  }
  fillList(){
    this.uploadProblemService.getAllProblems(this.currentPage -1, this.itemsPerPage).subscribe(
      data=>{
        console.log('List ', data.json());
        this.list = data.json();
        this.uploadProblemService.getTotalProblems().subscribe(
          d=>{
            this.totalItems = d;
          }
        );
      }, 
      err =>{
        console.log('Error ', err);
      }
    );
  }
  pageChange(event: any) {
    this.currentPage = event.page;
    if(this.contestView) {
      this.fillListContest();
    } else {
      this.fillList();
    }
    
  }
  
  getContest() {
    this.contestService.getOneContest(this.contestId).subscribe(
      data => {
        
        this.contest = data;
        this.startTimer();
        console.log('CONTEST ', this.contest);
      }, 
      err => {
        console.log(err);
      }
    );
  }
  startTimer() {
    let countDownDate = new Date(this.contest.enddate);
    // console.log('Count', countDownDate);
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
      }// console.log(this.hours+':'+this.minutes+':'+this.seconds);
    }, 1000); 

    

  }
}
