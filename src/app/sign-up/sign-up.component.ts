import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { AuthorizationService } from '../services/authorization.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = new User();
  confirmationPassword: String = '';

  constructor(
    private authorization: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    console.log('---> usuario registar_--> ');
    this.authorization.userRegistry(this.user).subscribe(
      (ok) => {
        console.log('ok (:');
        this.router.navigate(['/sign-in']);
      },
      (error) => {
        console.log('error ', error.status);
      }
    )
  }
  login() {
    this.router.navigate(['/sign-in']);
  }

}
