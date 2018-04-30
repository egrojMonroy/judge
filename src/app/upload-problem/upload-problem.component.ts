import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './../services/authorization.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UploadProblemService } from './../services/upload-problem.service'
import { TestCaseService } from './../services/test-case.service'; 
@Component({
  selector: 'app-upload-problem',
  templateUrl: './upload-problem.component.html',
  styleUrls: ['./upload-problem.component.css']
})
export class UploadProblemComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private uploadProblemService: UploadProblemService,
    private testCaseService: TestCaseService
  ) { }
  id:any;
  problem:any;
  code:string;
  language:string;
  ngOnInit() {
    this.id = this.getId();
    this.getProblem();
  }
  getId(){
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }  
  getProblem(){
    console.log(this.id);
    this.uploadProblemService.getProblemById(this.id).subscribe(
      data=>{
        console.log('AAAA',data.json());
        this.problem = data.json();
        console.log('ADFS',this.problem);
      }
    );
  }
  submit(){
    console.log("CODE ", this.code);
    const languageExt = this.language == 'java'?".java":".cpp";
    let fileName =''; 
    if(this.language =='java'){
      fileName = this.getClassName(this.code) + languageExt;
    } else { 
      fileName = this.id+languageExt;
    }
    var fileCode = new File([this.code], fileName, {
      type: "text/plain"
    });
    let formData = new FormData();
    formData.append('reportFile',fileCode);
    this.uploadProblemService.uploadFile(formData, this.language,this.problem.id).subscribe(
      data=>{
        console.log("CREATED FILE: ",data);
      }, 
      err => {
        console.log("ERROR ON CREATE: ",err);
      }
    );
    

  }

  getClassName(code){
    const n = this.code.search("public class ");
    let substr = this.code.substr(n,n + 100);
    let sub = substr.split(" ");
    return sub[sub.indexOf("class")+1];
  }
}
