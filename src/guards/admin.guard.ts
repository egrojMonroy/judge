import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from './../app/services/authorization.service';
import { WebService } from './../app/services/web.service';
import { SERVER } from '../config/server.config';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authorization: AuthorizationService,
  private webService: WebService,
  private route: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.webService.get(SERVER.ACCOUNT, this.getHeaders()).map(res => res.json()).map(account => {
        const can = account.authorities.includes('ROLE_ADMIN');
        if (can) {
          return true;
        } else {
          this.route.navigate(['/']);
          return false;
        }
      });
  }
  getHeaders() {
    const token = this.authorization.getToken();
    const headers = this.webService.getAuthHeaders(token);
    return headers;
  }
}
