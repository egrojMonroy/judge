import { Headers } from '@angular/http';
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
  uploadFile(formData,language,problemId){
    console.log("Upload ",language,problemId, SERVER.CREATE_CODE)

    let token = this.authorizationService.getToken();
    const headers = this.webService.getAuthHeadersWithoutContentType(token);
    return this.webService.post(`${SERVER.CREATE_CODE}?language=${language}&problemId=${problemId}`, formData, headers).map(
      data=> {
        return data.json();
      }
    );
  }
  getProblem(id){ 
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.PROBLEM}/${id}`).map(
      data => {
        return data.json();
      }
    );
  }
  uploadPDF(formData, id ) {
    const token = this.authorizationService.getToken();
    const headers = this.webService.getAuthHeadersWithoutContentType(token);
    console.log('Is uploading');
    return this.webService.post(`${SERVER.PROBLEM}/upload?problemId=${id}`, formData, headers);
  }
  uploadTestCode(formData, language ) {
    const token = this.authorizationService.getToken();
    const headers = this.webService.getAuthHeadersWithoutContentType(token);
    console.log('LANGUAGE ', language);
    return this.webService.post(`${SERVER.CREATE_CODE}/time?language=${language}`, formData, headers);
  }
  getPDF(){
    const headers = this.getHeaders();
    console.log("DFSAA");
    return  `${SERVER.PROBLEM}/download?fileName=3211`;
    // this.webService.get(`${SERVER.PROBLEM}/download?fileName=3211`,headers).map(
    //   data => {
    //     return new Blob([data.blob()], {type: 'application/pdf'});
    //   }
    // );
  }

  getProblemByActual() {
    let headers = this.getHeaders();
    console.log("ACTUAL ",`${SERVER.PROBLEM}/creator`);
    return this.webService.get(`${SERVER.PROBLEM}/creator`, headers).map(
      res => {
        return res.json();
      }
    );
  }
  uploadTestCase(formData) {
    let token = this.authorizationService.getToken();
    let headers = this.webService.getAuthHeadersWithoutContentType(token);
    return this.webService.post(`${SERVER.TESTCASE}/create`, formData, headers);
  }
  createProblem(problem){
    let headers = this.getHeaders();
    return this.webService.post(`${SERVER.PROBLEM}`,problem,headers);
  }
  updateProblem(problem){
    let headers = this.getHeaders();
    return this.webService.put(`${SERVER.PROBLEM}`,problem,headers);
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
  deleteProblem (problem) {
    problem.active = false;
    return this.updateProblem(problem);
  }
  getAllProblems(page, pagesize){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.PROBLEM}/active?page=${page}&size=${pagesize}`,headers);
  }
  getTotalProblems(){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.PROBLEM}/active`,headers).map(
      data => {
        return data.json().length;
      }
    );
  }
  getProblemById(id){
    console.log('get id ',id);
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.PROBLEM}/${id}`,headers);
  }
  getProblemUrl(id){
    return `${SERVER.PROBLEM}/download?fileName=${id}`;
  }
  checkUrl(id) {
    let url = `${SERVER.PROBLEM}/download?fileName=${id}`;
    console.log(url);
    let req = new XMLHttpRequest();
        req.open('HEAD',url,false);
        req.send(null);
    var headers = req.getAllResponseHeaders();
    return headers;
  }
  getSampleUrl(){
    return `${SERVER.PROBLEM}/download/sample`;
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
