import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ContestService } from './../services/contest.service';
import { RouterModule, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
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
    private authorization: AuthorizationService,
    private router: Router
  ) { }
  contestRegister: any;
  pastContests: any;
  commingContests: any;
  login:any;
  registerContest$:any;
  coderContest$:any;
  account: any;
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
  hasAuthority(authority) {
    //console.log("AUTH ");
    if (!this.account) {
      return false;
    }
    //console.log("AUTH ", this.account.authorities, authority);
    return this.account.authorities.includes(authority);
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
  confirm(pass) { 
    console.log('confirma', this.contestRegister.id, pass);
    if(this.contestRegister.type === 'privado') {
      console.log('JEJEJ');
      this.contestService.getPassAccess(this.contestRegister.id,pass).subscribe(
        data => {
          console.log('first ', data)
          if(data) {
            this.registerContest$ = this.contestService.registerContest(this.contestRegister.id).subscribe(
              res => {
                console.log("Good Register", res);      
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
