import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthorizationService } from './../services/authorization.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { User } from './user.model';
import { ResetPasswordService } from '../services/reset-password.service';
import { element } from 'protractor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  closeResult: string;
  userlist: any;
  objUser = new User();
  objUserEdit = new User();
  isUpdate: boolean = false;
  selectActive = 'select-one';
  role: any;
  authorities = [];
  getAuthorities: any;
  addAuthorities = [];
  userDelete: any;
  constructor(
    private userService: UserService,
    private modalService: NgbModal ,
    private resetPassword: ResetPasswordService
  ) { 
  }

  ngOnInit() {
    this.showAuthorities();
    this.showUser();
  }

  showUser() {
    this.userService.allUsers().subscribe(
      (ok) => {
        this.userlist = ok;
      }
    );
  }

  showAuthorities() {
    this.userService.authoritiesUser().subscribe(
      (ok) => {
        this.role = ok;
        this.role.forEach(element => {
          this.authorities.push({role: element, value: false});
        });
      }
    )
    return this.authorities;
  }

  createUser() {
    this.authorities.forEach(
      (ok) => {
        if (ok.value) {
          this.addAuthorities.push(ok.role);
        }
      }
    );
    this.objUser.authorities = this.addAuthorities;
    this.userService.createUser(this.objUser).subscribe(
      (ok) => {
        this.showUser();
        console.log('OK (:');
        this.resetRole();
      },
      (error) => {
        console.log('ERROR ):');
      }
    );
  }

  editUser() {
    this.objUserEdit = this.objUser;
    this.objUserEdit.authorities = [];
    this.authorities.forEach(
      (ok) => {
        if (ok.value) {
          this.objUserEdit.authorities.push(ok.role);
        }
      }
    );
    this.userService.updateUser(this.objUserEdit).subscribe(
      (ok) => {
        this.objUserEdit = new User();
        this.showUser();
      },
      (error) => {
      }
    );
  }

  showDataUser(user) {
    this.isUpdate = true;
    user.authorities.forEach(element => {
      this.authorities.forEach(array => {
        if (element === array.role) {
          array.value = true;
        }
      });
    });
    this.objUser = user;
  }

  resetRole() {
    this.authorities.forEach(array => {
      array.value = false;
    });
  }

  open(registry,user) {
    this.userDelete = user; 
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
  delete() {
    let user = this.userDelete;
    this.userService.deleteUser(user.login).subscribe(
      (del) => {
        this.resetRole();
        this.showUser();
      }
    );
  }

  selectRole(condition) {
    this.selectActive = condition;
  }

  checkOptionUser(role) {
    this.authorities.forEach((changeCheck) => {
      if (changeCheck.role === role.role && role.value === false) {
        changeCheck.value = true;
      } else {
        if (changeCheck.role === role.role && role.value === true) {
          changeCheck.value = false;
        }
      }
    });
  }

  create() {
    this.isUpdate = false;
    this.objUser = new User();
    this.resetRole();
  }

  setActive(user, condition) {
    this.objUser = user;
    this.objUser.activated = condition;
    this.userService.updateUser(this.objUser).subscribe((res) => {
    });
  }

  cancel() {
    this.objUser = new User();
    this.resetRole();
    this.isUpdate = false;
  }
}
