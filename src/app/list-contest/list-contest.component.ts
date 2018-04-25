import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-list-contest',
  templateUrl: './list-contest.component.html',
  styleUrls: ['./list-contest.component.css']
})
export class ListContestComponent implements OnInit {
  closeResult: string;
  constructor( private modalService: NgbModal ) { }

  ngOnInit() {
  }
  confirm() { 
    console.log('confirma');
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
