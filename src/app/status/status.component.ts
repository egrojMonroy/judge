import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './../services/authorization.service';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private authorizacion: AuthorizationService) { }

  ngOnInit() {

  }
}
