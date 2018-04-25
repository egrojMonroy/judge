import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { AuthorizationService } from './authorization.service';
import { SERVER } from '../../config/server.config';
@Injectable()
export class UploadProblemService {

  constructor( private webService: WebService , private authorizationService: AuthorizationService) { }

  // uploadCode(code, language) {
  //   let token = this.authorizationService.getToken();
  //   let headers = this.webService.getAuthHeaders(token);
  //   return this.webService.post
  // }
  uploadFile(formData){
    let token = this.authorizationService.getToken();
    let headers = this.webService.getAuthHeadersWithoutContentType(token);
    return this.webService.post(SERVER.POST, formData, headers);
  }
  uploadTestCase(formData){
    let token = this.authorizationService.getToken();
    let headers = this.webService.getAuthHeadersWithoutContentType(token);
    return this.webService.post(`${SERVER.TESTCASE}/create`,formData,headers);
  }
  createProblem(problem){
    let headers = this.getHeaders();
    return this.webService.post(`${SERVER.PROBLEM}`,problem,headers);
  }
  getHeaders(){
    let token = this.authorizationService.getToken();
    let headers = this.webService.getAuthHeaders(token);
    return headers;
  }
  getAllTestCases(){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.TESTCASE}`,headers);
  }
  getAllTestCasesById(id){
    let headers = this.getHeaders();
    console.log('get all ',id);
    console.log(`${SERVER.TESTCASE}/problem/${id}`);
    return this.webService.get(`${SERVER.TESTCASE}/problem/${id}`,headers);
  }
  deleteTestCase(id){
    let headers = this.getHeaders();
    return this.webService.delete(`${SERVER.TESTCASE}/${id}`,headers);
  }

  getAllProblems(){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.PROBLEM}`,headers);
  }

  getProblemById(id){
    console.log('get id ',id);
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.PROBLEM}/${id}`,headers);
  }

  searchProblemByName(name){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.PROBLEMSEARCH}?name=${name}`,headers).map(
      data=> { 
        return data.json();
      }
    );
  }

}