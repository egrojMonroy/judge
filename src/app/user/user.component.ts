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

/*
          _  _
         ( MOS )
          .---.      
         /   6_6        
         \_  (__\       
         //   \\        
        ((     ))      
  =======""===""========
           |||            
            |              

                 -It's programmer monkey 1.0
*/

/*  
+ ------------------------------------------------------------+
 | Module Name: classMonkey |
 | Module Purpose: emulate a monkey |
 | Inputs: Bananas |
 | Outputs: Grunts |
 | Throws: Poop |
  +------------------------------------------------------------+
*/

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userlist: any;
  objUser = new User();
  objUserEdit = new User();
  isUpdate: boolean = false;
  selectActive = 'select-one';
  role: any;
  authorities = [];
  getAuthorities: any;
  addAuthorities = [];

  constructor(
    private userService: UserService,
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

  delete(user) {
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
