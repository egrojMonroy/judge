import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-contest',
  templateUrl: './user-contest.component.html',
  styleUrls: ['./user-contest.component.css']
})
export class UserContestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('--------> desde el juez ---------->');
  }

}
