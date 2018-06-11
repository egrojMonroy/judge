import { UploadProblemService } from './../services/upload-problem.service';
import { UploadProblemComponent } from './../upload-problem/upload-problem.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router , ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-user-problem',
  templateUrl: './user-problem.component.html',
  styleUrls: ['./user-problem.component.css']
})
export class UserProblemComponent implements OnInit {
  closeResult: string;
  problemDelete: any;
  constructor(
    private modalService: NgbModal , 
    private router: Router, 
    private r: ActivatedRoute ,
    private problemService: UploadProblemService
    
  ) { }
  list:any;

  ngOnInit() {
    this.getProblemsByCreator();
  }
  createProblem(){
    this.router.navigate(['/create-problem']);
  }

  getProblemsByCreator() {
    this.problemService.getProblemByActual().subscribe(
      data => {
        console.log("Good in problem", data);
        this.list = data;
      }, 
      err => {
        console.log('error ', err);
      }
    );
  }
  click(id){
    this.router.navigate(["/create-problem/"+id]);
  }
  confirm(){
    console.log("CONFIRM");
    this.router.navigateByUrl("./problem");
  }
  delete() {
    console.log('Delete ', this.problemDelete);
    this.problemService.deleteProblem(this.problemDelete).subscribe(
      data=> {
        console.log('Delete correctly');
        this.getProblemsByCreator();
      }, 
      err => {
        console.log('Error on delete problem');
      }
    );
  }
  open(registry, problem?) {
    if(problem) { 
      this.problemDelete = problem;
    }
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
