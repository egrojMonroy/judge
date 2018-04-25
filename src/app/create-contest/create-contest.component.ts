import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';
import { contestModel } from './contestModel';
import { ContestService } from './../services/contest.service';
import { DatePipe } from '@angular/common';
import { CombineLatestOperator } from 'rxjs/operators/combineLatest';

enum Status {
  NONE = -1,
  ERROR,
  SUCCESS,
}
@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css']
})
export class CreateContestComponent implements OnInit {
  
  
  constructor(
    private contestService : ContestService
  ) { }
  model;
  status:Number;
  form = new contestModel('','','','','','');
  now: Date;
  end: Date;
  minStart : Date;
  minEnd : Date;
  maxEnd : Date;
  maxStart : Date;
  statusMessage: String; 
  isUpdating = false;
  
  ngOnInit() {
    this.now = new Date();
    this.minStart = new Date();
    this.maxStart = new Date(Date.now() + (60 * 24 * 60 * 60 * 1000));  
    this.minEnd = new Date(Date.now() + (10 * 60 * 1000));
    this.end = this.minEnd;
    this.maxEnd = new Date(Date.now() + ( 90 *24 * 60 * 60 * 1000));
  }
  create(){

      let fform ={
       "name":this.form.name, 
       "startdate":this.now.toISOString(),
       "enddate":this.end.toISOString(),
       "type":this.form.type
      }
      if(!this.form.name || !this.now || !this.end || !this.form.type ){
        this.status = Status.ERROR;
      } else {
        this.contestService.createContest(fform).subscribe(
          data => {
            this.status = Status.SUCCESS;
            this.statusMessage = "Concurso creado satisfactoriamente";
            this.isUpdating = true;
          }, 
          err => {
            this.status = Status.ERROR;
            this.statusMessage = "Hubo un error en la creacion";
            this.isUpdating = false;
          }
        );  
      }
      
  }
  update() {
    console.log('update');
  }
  getISOFormatedDate(year,month,dat,hour,minute){
    let date = new Date(year,month,dat,hour,minute);
    return date.toISOString();
  }
  outStartDate(){
    console.log('change',this.now);
    this.minEnd = this.now;
    this.minEnd.setMinutes(this.now.getMinutes()+30);
    this.end = this.minEnd;

    console.log(this.minEnd," ' ", this.maxEnd);
  
  }

}
