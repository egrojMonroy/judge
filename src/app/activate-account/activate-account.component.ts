import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { Route } from '@angular/router/src/config';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

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
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  key: any;

  constructor(
    private authorization: AuthorizationService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.ActivateAccountUser();
  }

  ActivateAccountUser() {
    this.activatedRouter.queryParams.subscribe(
      (params) => {
        this.key = params['key'];
      }
    )
    console.log('---> key --> wee --> ', this.key);
    this.authorization.ActivateAccount(this.key).subscribe(
      (ok) => {
        console.log('cuencta activada :)');
      },
      (error) => {
        console.log('cuencta echa miercoles :(');
      }
    );
  }
}
