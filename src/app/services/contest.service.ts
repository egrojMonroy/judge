import { Injectable } from '@angular/core';
import { SERVER } from './../../config/server.config';
import { WebService } from './../services/web.service';
import { AuthorizationService } from './authorization.service';
import { NullAstVisitor } from '@angular/compiler';

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

  registerContest(contestId) { 
    let headers = this.getHeaders();
    return this.webService.post(`${SERVER.CODER}/check?contestId=${contestId}`, null, headers).map(
      res => {
        return res.json();
      }
    );
  }
  updateContest(data) {
    let authorization = this.authorizationService.getToken();
    let options = this.webService.getAuthHeaders( authorization );
    return this.webService.put(`${SERVER.CONTEST}`, data , options).map(
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
  getPastContest() { 
    let headers = this.getHeaders();
    let page = 0; 
    let pagesize = 100; 
    return this.webService.get(`${SERVER.CONTEST}/before?page=${page}&size=${pagesize}&sort=startdate,desc`,headers).map(
      data => {
        return data.json();
      }
    );
  }
  getRunningContest() { 
    let headers = this.getHeaders();
    let page = 0; 
    let pagesize = 100; 
    return this.webService.get(`${SERVER.CONTEST}/after?page=${page}&size=${pagesize}&sort=startdate,desc`,headers).map(
      data => {
        return data.json();
      }
    );
  }
  getProblems(contestId) {
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.CONTEST}/problems?contestId=${contestId}`,headers).map(
      data => {
        return data.json();
      }
    ); 
  }
}
