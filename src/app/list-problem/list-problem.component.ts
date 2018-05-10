import { Component, OnInit, Input } from '@angular/core';
import { UploadProblemService } from './../services/upload-problem.service'; 
import { ContestService } from './../services/contest.service';
@Component({
  selector: 'app-list-problem',
  templateUrl: './list-problem.component.html',
  styleUrls: ['./list-problem.component.css']
})
export class ListProblemComponent implements OnInit {

  constructor(
    private uploadProblemService: UploadProblemService,
    private contestService: ContestService    
  ) { }
  list:any;
  @Input() contestView: boolean;
  @Input() contestId;
  currentPage=5;
  ngOnInit() {
    console.log("LLEGA QUE ",this.contestView, this.contestId);
    if(this.contestView) { 
      this.fillListContest();
    } else {
      this.fillList();  
    }
    
  }
  fillListContest() {
    this.contestService.getProblems(this.contestId).subscribe(
      data=>{
        console.log('List ', data);
        this.list = data;
      },
      err => {
        console.log('Error', err);
      }
    );
  }
  fillList(){
    this.uploadProblemService.getAllProblems().subscribe(
      data=>{
        console.log('List ', data.json());
        this.list = data.json();
      }, 
      err =>{
        console.log('Error ', err);
      }
    );
  }
}
