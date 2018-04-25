import { Injectable } from '@angular/core';
import { SERVER } from './../../config/server.config';
import { WebService } from './../services/web.service';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class TestCaseService {

  constructor(
    private webService: WebService,
    private authorizationService: AuthorizationService
  ) { }


  getHeaders(){
    let token = this.authorizationService.getToken();
    let headers = this.webService.getAuthHeaders(token);
    return headers;
  }
  // return Json of input output of a specific problem 
  // show param is to get input output that are ment to be shown 1 not shown 0
  getTestJson(problemId, show){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.TESTCASE}/problem-show/${problemId}?show=${show}`,headers).map(
      data =>  {
        return data.json();
      }
    );
  }
}
