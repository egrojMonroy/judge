import { Component, OnInit } from '@angular/core';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { UploadProblemService } from './../services/upload-problem.service';
import { problemModel } from './problemModel';
@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.css']
})
export class CreateProblemComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  constructor( private http: Http, private uploadProblemService: UploadProblemService) { }
  show = false; 
  problem: problemModel;
  createdProblem:boolean;
  ngOnInit() {
    this.problem = new problemModel();
    this.createdProblem = true;
  }

  upload() {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
        
        formData.append('reportFile', inputEl.files.item(0));
        
        
        this.uploadProblemService.uploadFile(formData).subscribe(
          data=> {
            console.log("success ", data);
          }, 
          err => {
            console.log("Fail ",err);
          }
        );
    }
  }
  createProblem(){
    console.log(this.problem);
    this.uploadProblemService.createProblem(this.problem).subscribe(
      data=>{
        console.log(data);
        let dataJson = data.json();
        this.problem.id=dataJson.id;
        this.createdProblem=false;
      },
      err => {
        console.log(err);
      }
    );
  }
  
}
