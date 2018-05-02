import { Injectable } from '@angular/core';
import { SERVER } from './../../config/server.config';
import { WebService } from './../services/web.service';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class StatusService {
  constructor(
    private webService: WebService,
    private authorizationService: AuthorizationService
  ) { }


  getHeaders(){
    let token = this.authorizationService.getToken();
    let headers = this.webService.getAuthHeaders(token);
    return headers;
  }
  getAll() {
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.SUBMISSION}?page=0&size=15&sort=dateupload,desc`,headers).map(
      data => {
        return data.json();
      }
    );
  }
}
