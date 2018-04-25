import { Component, OnInit } from '@angular/core';
import { UploadProblemService } from './../services/upload-problem.service'; 
@Component({
  selector: 'app-list-problem',
  templateUrl: './list-problem.component.html',
  styleUrls: ['./list-problem.component.css']
})
export class ListProblemComponent implements OnInit {

  constructor(private uploadProblemService: UploadProblemService) { }
  list:any;
  currentPage=5;
  ngOnInit() {
    this.fillList();
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
