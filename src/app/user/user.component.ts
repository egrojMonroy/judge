import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthorizationService } from './../services/authorization.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { User } from './user.model';
import { ResetPasswordService } from '../services/reset-password.service';

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
  objUserEdit = new User(null, null, '', '', '', false, null);
  isUpdate: boolean = false;

  constructor(
    private userService: UserService,
    // private resetPassword: ResetPasswordService
  ) { 
  }

  ngOnInit() {
    this.showUser();
    this.showAuthorities();
  }

  showUser() {
    this.userService.allUsers().subscribe(
      (ok) => {
        console.log(ok);
        this.userlist = ok;
      }
    );
  }

  showAuthorities() {
    this.userService.authoritiesUser().subscribe(
        (ok) => {
        console.log('autoridad -> ', ok);
      }
    )
  }

  createUser(ngform: NgForm) {
    console.log('---> el nuevo usuario --> ', this.objUser);
    this.userService.createUser(this.objUser).subscribe(
      (ok) => {
        this.showUser();
        console.log('OK (:');
        // this.resetPassword.init(ok.email).subscribe(
        //   (success) => {
        //     console.log('OK seend email (:');
        //   }
        // ) 
      },
      (error) => {
        console.log('ERROR ):');
      }
    );
  }

  editUser(ngform: NgForm) {
    // this.user = new User(ngform['id'], ngform['login'], ngform['firtNanem'], ngform['lastName'], ngform['email'], ngform['activated'], ngform['authorities']);
  }

  showDataUser(user) {
    this.objUser = user;
  }

  deleteUser() {

  }

  UserRoles() {

  }
  
}
