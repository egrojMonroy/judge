import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ContestService } from './../services/contest.service';
@Component({
  selector: 'app-list-contest',
  templateUrl: './list-contest.component.html',
  styleUrls: ['./list-contest.component.css']
})
export class ListContestComponent implements OnInit {
  closeResult: string;
  constructor( 
    private modalService: NgbModal ,
    private contestService: ContestService
  ) { }
  contestRegister: any;
  pastContests: any;
  commingContests: any;
  login:any;
  ngOnInit() {
    this.fillComming();
    this.fillPast();
    this.login = sessionStorage.getItem('login');
  }
  confirm() { 
    console.log('confirma', this.contestRegister);
    this.contestService.registerContest(this.contestRegister).subscribe(
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
