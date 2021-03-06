import { Injectable } from '@angular/core';
import { SERVER } from './../../config/server.config';
import { WebService } from './../services/web.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationService {

  constructor(private webService: WebService, private router: Router) { }
  
  login(user) {
    return this.webService.post(SERVER.AUTHENTICATE, user, this.webService.getJSONOptions()).map(res => res.json());
  }
  logout() {
    console.log("LOGOUT");
    localStorage.removeItem('mfx-token');
    sessionStorage.removeItem('mfx-token');
    localStorage.removeItem('login');
    sessionStorage.removeItem('login');
  }
  getAccountInfo() {
    return this.webService.get(SERVER.ACCOUNT, this.webService.getAuthHeaders(this.getToken())).map(res => res.json());
  }
  getId(){
    return this.getAccountInfo();
  }
  getToken() {
    return sessionStorage.getItem('mfx-token') ? sessionStorage.getItem('mfx-token') : (localStorage.getItem('mfx-token') ? localStorage.getItem('mfx-token') : ''); 
  }
  
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;
    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    let expired = !(date.valueOf() > new Date().valueOf());
    if (expired) {
      this.logout();
    }
    return expired;
  }
  isLogged() {
    return this.webService.get(SERVER.AUTHENTICATE, this.webService.getAuthHeaders(this.getToken())).map(res => {
      let logged = res.text() && !this.isTokenExpired();
      if (logged) {
        return true;
      } else {
        this.router.navigate(['/account/login']);
        return false;
      }
    });
  }

  // Registry User
  userRegistry(user) {
    return this.webService.post(SERVER.USER_REGISTER, user, this.webService.getAuthHeaders(this.getToken()));
  }

  // save user
  saveUser() {
    return this.webService.get(SERVER.USER_REGISTER, this.webService.getAuthHeaders(this.getToken())).map(res => {
      return res.json();
    });
  }

  // Activate Account User
  ActivateAccount(key) {
    return this.webService.get(SERVER.ACTIVATE_ACCOUNT+'?key='+key, this.webService.getAuthHeaders(this.getToken()));
  }

}
