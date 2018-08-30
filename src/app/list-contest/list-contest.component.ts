import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ContestService } from './../services/contest.service';
import { RouterModule, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-list-contest',
  templateUrl: './list-contest.component.html',
  styleUrls: ['./list-contest.component.css']
})
export class ListContestComponent implements OnInit {
  closeResult: string;
  contestRegister: any;

  itemsPerPage: number;
  totalItemsCurrent: number;
  totalItemsPast: number;
  currentPageCurrent: number;
  currentPagePast: number;

  pastContests: any;
  commingContests: any;
  login:any;
  registerContest$:any;
  coderContest$:any;
  account: any;
  constructor( 
    private modalService: NgbModal ,
    private contestService: ContestService,
    private authorization: AuthorizationService,
    private router: Router
  ) { 
    this.itemsPerPage = 3;
    this.currentPageCurrent = 0;
    this.totalItemsCurrent = 15;
    this.currentPagePast = 0;
    this.totalItemsPast = 15;

  }
 
  ngOnInit() {
    this.fillComming();
    this.fillPast();
    this.login = sessionStorage.getItem('login');
    this.authorization.getAccountInfo().subscribe(res => this.account = res);
  }
  ngOnDestroy() {
    if(this.registerContest$) {
      this.registerContest$.unsubscribe();
    }
    if(this.coderContest$) {
      this.coderContest$.unsubscribe();
    }
    
  }
  pageComming(event: any) {
    this.currentPageCurrent = event.page;
    this.fillComming();
  }
  pagePast(event: any) {
    console.log("Lleg");
    this.currentPagePast = event.page;
    this.fillPast();
  }
  hasAuthority(authority) {
    //console.log("AUTH ");
    if (!this.account) {
      return false;
    }
    //console.log("AUTH ", this.account.authorities, authority);
    return this.account.authorities.includes(authority);
  }
  click(id){
    // console.log('IHDIH', id , this.account);
    let contestDate = new Date(id.startdate); 
    let now = new Date();
    console.log(contestDate , now);
    if(contestDate > now && id.creatorId !== this.account.id) {
      console.log("Contest no ha empezado aun");
      alert("El Contest no ha empezado aun");
    } else {
      console.log("deberia entrar normal");
      if(this.hasAuthority('ROLE_ADMIN')) {
        this.router.navigate(['view-contest/'+id.id]);
      }
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
  confirm(pass) { 
    console.log('confirma', this.contestRegister.id, pass);
    if(this.contestRegister.type === 'privado') {
      this.contestService.getPassAccess(this.contestRegister.id,pass).subscribe(
        data => {
          console.log('first ', data)
          if(data) {
            this.registerContest$ = this.contestService.registerContest(this.contestRegister.id).subscribe(
              res => {   
                alert("Registrado en el contest!");    
              }, 
              err => {
                console.log ("ERROR ", err);
              }
            );
          } else {
            alert("Contrasena incorrecta");
          }
        }
      );
    } else {
      console.log('withour');
      this.registerContest$ = this.contestService.registerContest(this.contestRegister.id).subscribe(
        data => {
          console.log("Good Register", data);      
          alert("Registrado en el contest!");    
        }, 
        err => {
          console.log ("ERROR ", err);
        }
      );
    }
  }

  fillComming() {
    this.contestService.getTotalItemsRunning().subscribe(
      data => {this.totalItemsCurrent = data; }, 
      err => console.log(err)
    );
    
    this.contestService.getRunningContest(this.currentPageCurrent-1, this.itemsPerPage).subscribe(
      data=> {
        this.commingContests = data;
      }, 
      err => {
        console.log("ERROR ",err);
      }
    );
  }

  fillPast() {

    this.contestService.getTotalItemsPast().subscribe(
      data => {this.totalItemsPast = data; }, 
      err => console.log(err)
    );
    this.contestService.getPastContest(this.currentPagePast-1, this.itemsPerPage).subscribe(
      data=> {
        
        this.pastContests = data;
      }, 
      err => {
        console.log("ERROR ",err);
      } 
    );
  }




  open(registry, contest) {
    this.contestRegister = contest;
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
