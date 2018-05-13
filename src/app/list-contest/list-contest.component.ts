import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ContestService } from './../services/contest.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-list-contest',
  templateUrl: './list-contest.component.html',
  styleUrls: ['./list-contest.component.css']
})
export class ListContestComponent implements OnInit {
  closeResult: string;
  constructor( 
    private modalService: NgbModal ,
    private contestService: ContestService,
    private router: Router
  ) { }
  contestRegister: any;
  pastContests: any;
  commingContests: any;
  login:any;
  registerContest$:any;
  coderContest$:any;
  ngOnInit() {
    this.fillComming();
    this.fillPast();
    this.login = sessionStorage.getItem('login');
  }
  ngOnDestroy() {
    if(this.registerContest$) {
      this.registerContest$.unsubscribe();
    }
    if(this.coderContest$) {
      this.coderContest$.unsubscribe();
    }
    
  }
  click(id){
    let contestDate = new Date(id.startdate); 
    let now = new Date();
    console.log(contestDate , now);
    if(contestDate > now) {
      console.log("Contest no ha empezado aun");
      alert("El Contest no ha empezado aun");
    } else {
      console.log("deberia entrar normal");
      this.coderContest$ = this.contestService.getAuthtoContest(id.id).subscribe(
        data=> {
          if(data) {
            this.router.navigate(['view-contest/'+id.id]);
          } else {
            alert("No se encuentra registrado en el contest");
          }
        }
      );
      
    }
  }
  clickPast(id){
    let contestDate = new Date(id.startdate); 
    let now = new Date();
    console.log(contestDate , now);
    if(contestDate > now) {
      console.log("Contest no ha empezado aun");
      alert("El Contest no ha empezado aun");
    } else {
      console.log("deberia entrar normal");
      this.router.navigate(['view-contest/'+id.id]);
    }
  }
  confirm() { 
    console.log('confirma', this.contestRegister);
    this.registerContest$ = this.contestService.registerContest(this.contestRegister).subscribe(
      data => {
        console.log("Good Register", data);      
        alert("Registrado en el contest!");    
      }, 
      err => {
        console.log ("ERROR ", err);
      }
    );
  }

  fillComming() {
    this.contestService.getRunningContest().subscribe(
      data=> {
        console.log(data);
        this.commingContests = data;
      }, 
      err => {
        console.log("ERROR ",err);
      }
    );
  }

  fillPast() {
    this.contestService.getPastContest().subscribe(
      data=> {
        console.log(data);
        this.pastContests = data;
      }, 
      err => {
        console.log("ERROR ",err);
      }
    );
  }




  open(registry, contestId) {
    this.contestRegister = contestId;
    const activeModal = this.modalService.open(registry).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('This', this.closeResult)
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
} 
