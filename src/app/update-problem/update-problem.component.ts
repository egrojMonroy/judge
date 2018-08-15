import { AuthorizationService } from './../services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { problemModel } from '../create-problem/problemModel';
import { Http } from '@angular/http';
import { UploadProblemService } from '../services/upload-problem.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-problem',
  templateUrl: './update-problem.component.html',
  styleUrls: ['./update-problem.component.css']
})
export class UpdateProblemComponent implements OnInit {
  constructor( 
    private http: Http, 
    private uploadProblemService: UploadProblemService,
    private authorization: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  show = false;
  problem: problemModel;
  createdProblem: boolean;
  pdfFile: any;
  id: any;
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
    this.id = this.getId();
    this.getProblem(this.id);
   }
  getProblem(id){
    this.uploadProblemService.getProblem(id).subscribe(
      data => {
        console.log('DAta ', data);
       this.problem = data;
      }
    ); 
  }
  getId(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log("LLEGA EL problem ",id);
    return id;
  }
  updateProblem() {
    console.log(this.problem);
    this.uploadProblemService.updateProblem(this.problem).subscribe(
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
    //window.open(this.uploadProblemService.getSampleUrl());
    alert(this.uploadProblemService.checkUrl(this.id));
  }
  downloadAct() {
    this.uploadProblemService.getSampleUrl()
  }
  onChange(event) {
    const file = event.srcElement.files;
    if ( file[0].type !== 'application/pdf') {
      console.log('Type error');
      this.pdfFile = null;
    } else {
    this.pdfFile = file[0];
    
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

