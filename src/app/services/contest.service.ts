import { Headers } from '@angular/http';
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

  getContestsByActual() {
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.CONTEST}/creator`, headers).map(
      res => {
        return res.json();
      }
    );
  }
  createContest(data) {
    let authorization = this.authorizationService.getToken();
    let options = this.webService.getAuthHeaders( authorization );
    return this.webService.post(`${SERVER.CONTEST}`, data , options).map(
      res => {
       // console.log('RES', res);
        return res.json();
      }
    );
  }
  getPassAccess(contestId, password) {
    let Headers = this.getHeaders();
    return this.webService.post(`${SERVER.CONTEST}/verify?contestId=${contestId}&password=${password}`,null, Headers).map(
      data => {
       // console.log('In Service ',data);
        return data.json();
        }
    );
  }
  getAuthtoContest(contestId) {
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.CODER}/contest?contestId=${contestId}`,headers).map(
      res => {
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
   // console.log("UPDATE", data );
    let authorization = this.authorizationService.getToken();
    let options = this.webService.getAuthHeaders( authorization );
    return this.webService.put(`${SERVER.CONTEST}`, data , options).map(
      res => {
       // console.log('RES', res);
        return res.json();
      }
    );
  }
  deleteContest(contest) {
    contest.active = false;
    return this.updateContest(contest);
  }
  getOneContest(id){
    let Headers = this.getHeaders();
    return this.webService.get(`${SERVER.CONTEST}/${id}`,Headers).map(
      data => {
        return data.json();
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
  getPastContest(page, pagesize) { 
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.CONTEST}/before?page=${page}&size=${pagesize}&sort=startdate,desc`,headers).map(
      data => {
       // console.log('data', data);
        return data.json();
      }
    );
  }
  getRunningContest(page, pagesize) { 
    let headers = this.getHeaders();
   // console.log("URL RUNIGN0", `${SERVER.CONTEST}/after?page=${page}&size=${pagesize}&sort=startdate,desc`);
    return this.webService.get(`${SERVER.CONTEST}/after?page=${page}&size=${pagesize}&sort=startdate,desc`,headers).map(
      data => {
       // console.log('contest', data.json().length);
        return data.json();
      }
    );
  }
  getTotalItemsRunning(){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.CONTEST}/after`, headers).map(
      res => { return res.json().length; }
    );
  }
  getTotalItemsPast(){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.CONTEST}/before`, headers).map(
      res => { return res.json().length; }
    );
  }
  getProblems(contestId, page, pagesize) {
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.CONTEST}/problems?page=${page}&size=${pagesize}&contestId=${contestId}`,headers).map(
      data => {
        return data.json();
      }
    ); 
  }
  getTotalItemsContest(contestId){
    let headers = this.getHeaders();
    return this.webService.get(`${SERVER.CONTEST}/problems?contestId=${contestId}`,headers).map(
      data => {
        return data.json().length;
      }
    );
  }
}
