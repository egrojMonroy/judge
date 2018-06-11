import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { Route } from '@angular/router/src/config';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


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
    this.authorization.ActivateAccount(this.key).subscribe(
      (ok) => {
        //console.log('Cuenta activada');
      },
      (error) => {
        //console.log('Error on activate account');
      }
    );
  }
}
