import { Component, OnInit } from '@angular/core';
import { contestModel } from './contestModel';
import { ContestService } from './../services/contest.service';
import { Router } from '@angular/router';
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
    private contestService : ContestService,
    private router: Router
  ) { }
  problem: any;
  filteredProblems: string[];

  model;
  status:Number;
  form = new contestModel('','','','','','publico');
  now: Date;
  end: Date;
  minStart : Date;
  minEnd : Date;
  maxEnd : Date;
  maxStart : Date;
  statusMessage: String; 
  isUpdating = false;
  contestUpdate:any; 
  list = [];
  showMessage = false;

  ngOnInit() {
    this.form.type= "publico";
    this.now = new Date(Date.now()+(10*60*1000));
    this.minStart = new Date(Date.now()+(10*60*1000));
    this.maxStart = new Date(Date.now() + (60 * 24 * 60 * 60 * 1000));  
    this.minEnd = new Date(Date.now() + (30 * 60 * 1000));
    this.end = this.minEnd;
    this.maxEnd = new Date(Date.now() + ( 90 *24 * 60 * 60 * 1000));
  }

  create(){
      if(this.list.length<=1){
        this.showMessage = true; 
        return;
      } 
      let fform ={
       "name":this.form.name, 
       "startdate":this.now.toISOString(),
       "enddate":this.end.toISOString(),
       "type":this.form.type,
       "problems": this.list, 
       "password":this.form.password?this.form.password:'',
       "active": this.form.active
      }
      console.log('CREATE', this.now, this.end.toISOString());
      console.log('Form show create', fform);
      
        this.contestService.createContest(fform).subscribe(
          data => {
            console.log('DATA ',data);
            this.contestUpdate = data;
            this.status = Status.SUCCESS;
            this.statusMessage = "Concurso creado satisfactoriamente";
            this.router.navigate(['list-contest']);
            //this.isUpdating = true;
          }, 
          err => {
            this.status = Status.ERROR;
            this.statusMessage = "Hubo un error en la creacion";
            //this.isUpdating = false;
          }
        );  
      
      
  }
  update() {
    this.contestUpdate.name = this.form.name;
    this.contestUpdate.startdate = this.now.toISOString();
    this.contestUpdate.enddate = this.end.toISOString();
    this.contestUpdate.type = this.form.type;
    this.contestService.updateContest( this.contestUpdate ).subscribe(
      data => {
        console.log("Updated Success");
        console.log(data);
      },
      err => {
        console.log("ERROR ",err);
      }
    );
  }
  getISOFormatedDate(year,month,dat,hour,minute){
    let date = new Date(year,month,dat,hour,minute);
    return date.toISOString();
  }
  outStartDate(){
    console.log('change',this.now);
    this.minEnd = this.maxStart = new Date(Date.now() + (60 * 24 * 60 * 60 * 1000));  
    this.minEnd.setMinutes(this.now.getMinutes()+30);
  
  }

  filterProblems(event) {
    let query = event.query;
    console.log('query ',query);
    this.contestService.searchProblemByName(query).subscribe(
      data=>{
        this.filteredProblems = data;
        console.log(this.filteredProblems);
      },
      err=>{
        console.log('ERRO ',err);
      }
    );
  }
  addProblem(problem){
    console.log("SUZE", this.list.length);
    if(this.list.length >= 1  ){
      this.showMessage = false;
    }
    if(this.list.find(x=> x.id == problem.id)){
      
    }else {
      this.list.push(problem);
    }
     
  }
  deleteProblem(problem){
    this.list = this.list.filter(x => x.id != problem.id);
  }

}
