import { contestModel } from './../create-contest/contestModel';
import { CreateContestComponent } from './../create-contest/create-contest.component';
import { ContestService } from './../services/contest.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-contest',
  templateUrl: './update-contest.component.html',
  styleUrls: ['./update-contest.component.css']
})
export class UpdateContestComponent implements OnInit {

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contestService: ContestService
  ) { }
  id: any;
  problem: any;
  filteredProblems: string[];
  list = [];
  showMessage = false;
  now: Date;
  minStart: Date;
  maxStart: Date;
  minEnd: Date;
  end: Date;
  maxEnd: Date;
  contestUpdate:any; 
  form = new contestModel('','','','','','');
  ngOnInit() {
    
    this.id = this.getId();
    if(this.id) {
      this.getContest(this.id);
      
      
      this.maxStart = new Date(Date.now() + (60 * 24 * 60 * 60 * 1000));  
      // this.minEnd = new Date(Date.now() + (30 * 60 * 1000));
      this.maxEnd = new Date(Date.now() + ( 90 *24 * 60 * 60 * 1000));
    }
  }
  getId(){
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }
  update() {
    
      this.contestUpdate.name = this.form.name;
      this.contestUpdate.startdate = this.now.toISOString();
      this.contestUpdate.enddate = this.end.toISOString();
      this.contestUpdate.type = this.form.type;
      this.contestUpdate.problems = this.list;
      this.contestUpdate.password = this.form.password; 
      console.log('CONTEST UPDATE ', this.contestUpdate);
    this.contestService.updateContest( this.contestUpdate ).subscribe(
      data => {
        console.log("Updated Success");
        console.log(data);
        this.router.navigate(['create']);
      },
      err => {
        console.log("ERROR ",err);
      }
    );
  }
  getContest(id){
    this.contestService.getOneContest(id).subscribe(
      data => {
        console.log(data);
        this.now = new Date(data.startdate);
        this.end = new Date(data.enddate);
        this.minStart = new Date(Date.now()+(5*60*1000));
        this.minEnd = new Date(data.enddate);
        this.form.type = data.type;
        this.form.name = data.name;
        this.form.password = data.password;
        this.list = data.problems;
        this.contestUpdate = data;
      }
    );
  }

  outStartDate(){
    console.log('change',this.now);
    this.minEnd = this.now;
    //this.minEnd.setMinutes(this.now.getMinutes()+30);
    if(this.minEnd > this.end) {this.end = this.minEnd;}
    console.log(this.minEnd," ' ", this.maxEnd);
  }

  getISOFormatedDate(year,month,dat,hour,minute){
    let date = new Date(year,month,dat,hour,minute);
    return date.toISOString();
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
