import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './../services/authorization.service';
import { StatusService } from './../services/status.service';
import { Observable } from 'rxjs/Observable';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(
    private statusService: StatusService,
    private authorization: AuthorizationService,
  ) { }
  list: any;
  sub:any;
  getAll$:any;
  account: any;
  ngOnInit() {
    this.fillList();
    this.sub = Observable.interval(80000)
    .subscribe((val) => { this.fillList(); });
    this.authorization.getAccountInfo().subscribe(res => this.account = res);
  }
  ngOnDestroy() {
    if(this.getAll$){
      this.getAll$.unsubscribe();
      this.sub.unsubscribe();
    }
  }
  fillList() {
      
      this.getAll$ = this.statusService.getAll().subscribe(
        data => {
          ///falta poner paginador y que pagine
          
          this.list = data.content;
          console.log("Data, correct",this.list);
        }, 
        err =>   {
          console.log("ERROR ", err);
         }
      );
    
  }
  download(sub) {
    console.log('subsubsub', sub);
    this.statusService.getCode(sub.id).subscribe(
      data=>{ 
        let blob = new Blob([data._body], {type: "text/plain;charset=utf-8"});
        let fileName = sub.submitter.login+sub.language;
        if(sub.language.toLowerCase()==='java') {
          fileName += '.java';
        } else {
          fileName += '.cpp';
        }
        saveAs(blob, fileName);
      },
      err=>console.log(err)
    );
  }
  hasAuthority(authority) {
    //console.log("AUTH ");
    if (!this.account) {
      return false;
    }
    //console.log("AUTH ", this.account.authorities, authority);
    return this.account.authorities.includes(authority);
  }
}
