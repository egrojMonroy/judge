import { Angular2Csv } from 'angular2-csv';
import { Component, OnInit } from '@angular/core';
import { StatusService} from './../services/status.service';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(
    private statusService: StatusService,
    
  ) { }
  list: any;
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: 'Ranking Contest',
    useBom: false,
    removeNewLines: true,
    keys: ['first','last','email' ]
  };
  val = {};
  ngOnInit() {
    
    console.log("JEHEHEHEHEHEJDH");
    this.fillList();
   
  }
  fillList() {
    this.statusService.getRank().subscribe(
      data => {
        this.list = data;
        new Angular2Csv(data, 'res');
        console.log("HEEEEY",this.list);
      }, 
      err =>   {
        console.log("ERROR ", err);
       }
    );
  }
  
}
