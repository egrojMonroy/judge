import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UploadProblemService } from './../services/upload-problem.service'

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.css']
})
export class ViewProblemComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private uploadProblemService: UploadProblemService
  ) { }
  id: Number;
  problem: any; 
  ngOnInit() {
    this.id = parseInt(this.getId());
    this.getProblem(this.id);
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
}
