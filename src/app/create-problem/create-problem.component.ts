import { Component, OnInit } from '@angular/core';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { UploadProblemService } from './../services/upload-problem.service';
import { problemModel } from './problemModel';
import { TooltipModule } from 'ngx-bootstrap';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthorizationService } from './../services/authorization.service';
@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.css']
})
export class CreateProblemComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  constructor( 
    private http: Http, 
    private uploadProblemService: UploadProblemService,
    private authorization: AuthorizationService,
    private router: Router
  ) { }
  show = false;
  problem: problemModel;
  createdProblem: boolean;
  pdfFile: any;
  codeTest: any; 
  inputTest: any;
  language: any;
  nameGood:any; 
  status:Number;
  fileGood:any;
  time = '';
  ngOnInit() {
    this.problem = new problemModel(6,6,1);
    this.createdProblem = true;
    if(!this.problem.name){
      this.nameGood = false;
    } else { 
      this.nameGood = true;
    }
  }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   let url: string = state.url;
  //   console.log(url);
  //   return this.checkLogin(url);
  // }
  // checkLogin(url){
  //   console.log("Is Logged",this.authorization.isLogged());
  //   if(this.authorization.isLogged()) {
  //     return true;
  //   }
  //    // Navigate to the login page with extras
  //    this.router.navigate(['/']);
  //   return false;
  // }
  // upload() {
  //   let inputEl: HTMLInputElement = this.inputEl.nativeElement;
  //   let fileCount: number = inputEl.files.length;
  //   let formData = new FormData();
  //   if (fileCount > 0) { // a file was selected
        
  //       formData.append('reportFile', inputEl.files.item(0));
        
        
  //       this.uploadProblemService.uploadFile(formData).subscribe(
  //         data=> {
  //           console.log("success ", data);
  //         }, 
  //         err => {
  //           console.log("Fail ",err);
  //         }
  //       );
  //   }
  // }

  createProblem() {
    if(this.nameGood && this.fileGood) {
      this.uploadProblemService.createProblem(this.problem).subscribe(
        data => {
          console.log(data);
          const dataJson = data.json();
          this.problem.id = dataJson.id;
          this.createdProblem = false;
          this.uploadPDF(dataJson.id);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      if(!this.nameGood){
        this.status=1;
      } 
      if(!this.fileGood){
        this.status=2
      }
    }
  }
  uploadPDF(id) {
    const formData = new FormData();
    if (this.pdfFile != null && this.pdfFile.type === 'application/pdf') {
      formData.append('reportFile', this.pdfFile);
      this.uploadProblemService.uploadPDF(formData, id).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  download() {
    window.open(this.uploadProblemService.getSampleUrl());
  }
  onBlur() {
    console.log("HEY");
    if(this.problem.name)
    {this.nameGood = true;}
    else {
      this.nameGood = false;
    }
  }
  onChange(event) {
    const file = event.srcElement.files;
    if ( file[0].type !== 'application/pdf') {
      console.log('Type error');
      this.pdfFile = null;
    } else {
    this.pdfFile = file[0];
    this.fileGood = true;
    console.log(this.pdfFile);
    }
  }
  onChangeCode(event) {
    const file = event.srcElement.files;
    this.codeTest = file[0];
    this.fileGood = true;
    console.log(this.codeTest);

  }
  onChangeInput(event) {
    const file = event.srcElement.files;
    this.inputTest = file[0];
    this.fileGood = true;
    console.log(this.inputTest);
    
  }
  sendCode(){
    this.time = '';
    const formData = new FormData();
    console.log(this.codeTest, this.inputTest, this.language);
      formData.append('reportFile', this.codeTest);
      formData.append('inputFile', this.inputTest);
      this.uploadProblemService.uploadTestCode(formData, this.language).subscribe(
        data => {
          console.log('console log ', data.json());
          this.time = data.json() == '0'? '0.00': data.json() ;
          if(this.language.includes('java')) {
            this.problem.timelimitjava = Math.ceil( +this.time + 0.01 );
          } else {
            this.problem.timelimit =   Math.ceil( +this.time + 0.01 );
          }
        },
        err => {
          console.log('ERR', err);
        }
      );
    
  }
}
