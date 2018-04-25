import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router , ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-user-problem',
  templateUrl: './user-problem.component.html',
  styleUrls: ['./user-problem.component.css']
})
export class UserProblemComponent implements OnInit {
  closeResult: string;
  constructor(private modalService: NgbModal , private router: Router, private r: ActivatedRoute ) { }

  ngOnInit() {
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
