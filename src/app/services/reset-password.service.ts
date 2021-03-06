import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { AuthorizationService } from './authorization.service';
import { SERVER } from '../../config/server.config';


@Injectable()
export class ResetPasswordService {

  constructor(
    private webService: WebService,
    private authorization: AuthorizationService
  ) { }

  init(email: String) {
    return this.webService.post(SERVER.RESET_PASSWORD_INIT,
      email.trim(),
      this.webService.getAuthHeaders(this.authorization.getToken()));
  }

  finish(keyAndPassword: any) {
    return this.webService.post(SERVER.RESET_PASSWORD_FINISH,
      keyAndPassword,
      this.webService.getAuthHeaders(this.authorization.getToken()));
  }

}
