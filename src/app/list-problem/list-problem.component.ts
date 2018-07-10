import { Component, OnInit, Input } from '@angular/core';
import { UploadProblemService } from './../services/upload-problem.service'; 
import { ContestService } from './../services/contest.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

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
  currentPage=0;
  totalItems: number;
  itemsPerPage: number; 
  ngOnInit() {
    console.log("LLEGA QUE ",this.contestView, this.contestId);
    if(this.contestView) { 
      this.fillListContest();
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
}
