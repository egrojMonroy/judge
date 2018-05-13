import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { AuthorizationService } from '../services/authorization.service';

/*
          _  _
         ( MOS )
          .---.      
         /   6_6        
         \_  (__\       
         //   \\        
        ((     ))      
  =======""===""========
           |||            
            |              

                 -It's programmer monkey 1.0
*/

/*  
+ ------------------------------------------------------------+
 | Module Name: classMonkey |
 | Module Purpose: emulate a monkey |
 | Inputs: Bananas |
 | Outputs: Grunts |
 | Throws: Poop |
  +------------------------------------------------------------+
*/

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = new User();
  confirmationPassword: String = '';

  constructor(
    private authorization: AuthorizationService
  ) { }

  ngOnInit() {
  }

  register() {
    console.log('---> usuario registar_--> ');
    this.authorization.userRegistry(this.user).subscribe(
      (ok) => {
        console.log('ok (:');
      },
      (error) => {
        console.log('error ):', error.status);
      }
    )
  }

}
