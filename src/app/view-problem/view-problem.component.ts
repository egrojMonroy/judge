import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UploadProblemService } from './../services/upload-problem.service'
import { TestCaseService } from './../services/test-case.service'; 
@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.css']
})
export class ViewProblemComponent implements OnInit {
  pdfSrc:any;
  constructor(
    private route: ActivatedRoute,
    private uploadProblemService: UploadProblemService,
    private testCaseService: TestCaseService
  ) { }
  id: Number;
  problem: any; 
  tests: any;
  resumePdfViewerObject: any;
  ngOnInit() {
    this.id = parseInt(this.getId());
    this.getProblem(this.id);
    this.getTestCases();
    this.getPDF();
     
  }
  getPDF(){
    console.log("URL",this.uploadProblemService.getPDF());
    console.log("HEADERS",this.uploadProblemService.getHeaders());
    this.resumePdfViewerObject = {
      url: this.uploadProblemService.getPDF(),
      withCredentials: true, 
      httpHeaders: this.uploadProblemService.getHeaders()
      
    }
    // this.uploadProblemService.getPDF().subscribe(
    //   data=> {
    //     console.log("ELLLLEGA");
    //     const fileURL = URL.createObjectURL(data);
    //     console.log("FILE ", fileURL);
    //     this.pdfSrc=fileURL;
    //   }, 
    //   err => {
    //     console.log("AFS");
    //     console.log(err);
    //   }
    // );
  }
  getId(){
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }
  getProblem( id  ){
    console.log(id);
    this.uploadProblemService.getProblemById(id).subscribe(
      data=>{
        console.log('AAAAAAA',data.json());
        this.problem = data.json();
        console.log('ADFS',this.problem);
      }
    );
  }
  getTestCases(){
    this.testCaseService.getTestJson(this.id , 1).subscribe(
      data=>{
        this.tests = data;
        console.log('WORJS ', data);
      }, 
      err => {
        console.log(err);
      }
    );
  }
}
