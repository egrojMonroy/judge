import { Injectable } from '@angular/core';
import { SERVER } from './../../config/server.config';
import { WebService } from './../services/web.service';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class ContestService {

  constructor(
    private webService: WebService,
    private authorizationService: AuthorizationService
  ) { }

  token: string;

  createContest(data) {
    let authorization = this.authorizationService.getToken();
    let options = this.webService.getAuthHeaders( authorization );
    return this.webService.post(`${SERVER.CONTEST}`, data , options).map(
      res => {
        console.log('RES', res);
        return res.json();
      }
    );
  }

  getHeaders(){
    let token = this.authorizationService.getToken();
    let headers = this.webService.getAuthHeaders(token);
    return headers;
  }
  
  searchProblemByName(name){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.PROBLEMSEARCH}?name=${name}`,headers).map(
      data=> { 
        return data.json();
      }
    );
  }
  addProblem(problem){
    let headers = this.getHeaders();
  }
}
