import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './../services/authorization.service';
import { StatusService } from './../services/status.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(
    private statusService: StatusService
  ) { }
  list: any;
  sub:any;
  ngOnInit() {
    this.fillList();
    this.sub = Observable.interval(80000)
    .subscribe((val) => { this.fillList(); });
  }
  fillList() {
      
      this.statusService.getAll().subscribe(
        data => {
          ///falta poner paginador y que pagine
          this.list = data.content;
          // console.log("Data, correct",this.list);
        }, 
        err =>   {
          console.log("ERROR ", err);
         }
      );
    
  }
}
