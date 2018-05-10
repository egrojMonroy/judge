import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contest-coder',
  templateUrl: './contest-coder.component.html',
  styleUrls: ['./contest-coder.component.css']
})
export class ContestCoderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }
  contestId: any;
  ngOnInit() {
    this.contestId = this.getId();
  }
  getId(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log("LLEGA EL CONTEST ",id);
    return id;
  }
}
