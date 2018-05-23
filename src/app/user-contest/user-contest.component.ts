import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router , ActivatedRoute} from '@angular/router';
import { ContestService } from './../services/contest.service';
@Component({
  selector: 'app-user-contest',
  templateUrl: './user-contest.component.html',
  styleUrls: ['./user-contest.component.css']
})
export class UserContestComponent implements OnInit {

  constructor(
    private modalService: NgbModal , 
    private router: Router, 
    private r: ActivatedRoute ,
    private contestService: ContestService
  ) { }
  closeResult: string;
  ngOnInit() {
    console.log('--------> desde el juez ! ---------->');
    this.getContestByCreator();
  }
  list:any;
  getContestByCreator() {
    this.contestService.getContestsByActual().subscribe(
      data => {
        console.log('Good in contest', data);
        this.list = data; 
      }, 
      err => {
        console.log('Error ', err);
      }
    );
  }
  update(id){
    this.router.navigate(['create-contest/'+id]);
  }
  confirm(){
    console.log("CONFIRM");
    this.router.navigateByUrl("./problem");
  }

  open(registry) {
    this.modalService.open(registry).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('This', this.closeResult)
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
