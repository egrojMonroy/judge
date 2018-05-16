import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './../services/authorization.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private authorization: AuthorizationService
  ) { }
  account: any;
  ngOnInit() {
    this.authorization.getAccountInfo().subscribe(res => this.account = res);
  }
  hasAuthority(authority) {
    if (!this.account) {
      return false;
    }
    return this.account.authorities.includes(authority);
  }
}
