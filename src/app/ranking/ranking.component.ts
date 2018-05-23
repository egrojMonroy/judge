import { Component, OnInit } from '@angular/core';
import { StatusService} from './../services/status.service';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(
    private statusService: StatusService
  ) { }
  list: any;
  ngOnInit() {
    
    console.log("JEHEHEHEHEHEJDH");
    this.fillList();
   
  }
  fillList() {
    this.statusService.getRank().subscribe(
      data => {
        this.list = data;
        console.log("HEEEEY",this.list);
      }, 
      err =>   {
        console.log("ERROR ", err);
       }
    );
  }
  
}
