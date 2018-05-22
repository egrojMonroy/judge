import { Component, OnInit, TemplateRef } from '@angular/core';
import { element } from 'protractor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationService } from './../services/authorization.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private authorization: AuthorizationService,
    private router: Router
  ) { }
  login: any;
  account: any;
  ngOnInit() {
    this.login = sessionStorage.getItem('login');
    this.authorization.getAccountInfo().subscribe(res => this.account = res);
  }

  hasAuthority(authority) {
    console.log("AUTH ");
    if (!this.account) {
      return false;
    }
    console.log("AUTH ", this.account.authorities, authority);
    return this.account.authorities.includes(authority);
  }
  click() {
    this.router.navigate(['/sign-in']);
  }
  logout() {
    this.authorization.logout();
    this.login = '';
    this.router.navigate(['/']);
  }


  open(registry) {
    this.modalService.open(registry).result.then((result) => {
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

