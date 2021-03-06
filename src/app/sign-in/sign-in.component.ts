import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './../services/authorization.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private authorizationService: AuthorizationService) { }

  user = {
    username: '',
    password: '',
    rememberMe: false
  }
  showPassword = false;
  account;
  getAccount;
  showErrorMessage: any = false;
  ngOnInit() {
  }
  ngOnDestroy () {
    if (this.getAccount) {
      this.getAccount.unsubscribe();
    }
  }
  login() {
    this.authorizationService.login(this.user).subscribe(res => {
      this.showErrorMessage = false;
      // borrar todas las variables 
      localStorage.removeItem('mfx-token');
      sessionStorage.removeItem('mfx-token');
      localStorage.removeItem('login');
      sessionStorage.removeItem('login'); 
      // guardar las variables del usuario registrado
      if (this.user.rememberMe) {
        localStorage.setItem('mfx-token', res.id_token);
        localStorage.setItem('login', this.user.username);
      } else {
        sessionStorage.setItem('mfx-token', res.id_token);
        sessionStorage.setItem('login', this.user.username);
      }
      this.getAccount = this.authorizationService.getAccountInfo().subscribe( res => {
        this.account = res;
        if (!this.account.defaultUrl) {
          this.account.defaultUrl = '/';
          window.location.reload();
        }
        this.router.navigate([this.account.defaultUrl]);
      });
    }, error => {
      console.log(error.status);
      if (error.status === 401) {
        this.showErrorMessage = 'Username or password was incorrect';
      }
      if (error.status === 500) {
        this.showErrorMessage = 'Unable to connect to server';
      }
    });
  }
 


}
