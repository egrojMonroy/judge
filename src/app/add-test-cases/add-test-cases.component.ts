import { Component, OnInit, Input } from '@angular/core';
import { UploadProblemService } from './../services/upload-problem.service'; 
@Component({
  selector: 'app-add-test-cases',
  templateUrl: './add-test-cases.component.html',
  styleUrls: ['./add-test-cases.component.css']
})
export class AddTestCasesComponent implements OnInit {
  @Input('problem') problem: any; 
  constructor( private uploadProblemService: UploadProblemService) { }
  count = 0;
  show = false;
  input: any; 
  output: any;
  list: any;
  ngOnInit() {
    this.fillList();
  }
  fillList(){
    console.log('Problem ', this.problem);
    this.uploadProblemService.getAllTestCasesById(this.problem.id).subscribe(
      data=>{
        console.log('List ', data.json());
        this.list = data.json();
      }, 
      err =>{
        console.log('Error ', err);
      }
    );

  }
  createTestCase() {
    
    var fileInput = new File([this.input], "input"+this.count+".txt", {
      type: "text/plain"
    });
    var fileOutput = new File([this.output],"output"+this.count+".txt",{
      type: "text/plain"
    });
    this.count++;
    let formData = new FormData();
    formData.append('problem_id',this.problem.id as string);
    formData.append('inputFile',fileInput);
    formData.append('outputFile',fileOutput);
    formData.append('show', this.show?"1":"0");
    this.uploadProblemService.uploadTestCase(formData).subscribe(
      data=> {
        console.log("success test case", data);
        this.input = '';
        this.output = '';
        this.fillList();
      }, 
      err => {
        console.log("Fail test case",err);
      }
    );
  } 
  deleteTestCase(id){
    console.log('id of testcase to delete ',id );
    this.uploadProblemService.deleteTestCase(id).subscribe(
      data => {
        console.log('Delete worked ',data);
        this.fillList();
      },
      err => {
        console.log('Error ', err);
      }
    );
  }
}
