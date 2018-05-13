import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../services/reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  key: any;
  resetAccount: any;

  error: any;
  confirmPassword: any;
  success: any;

  constructor(
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute,
    private location: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.key = params['key'];
    });
    this.resetAccount = {};
    console.log('este es mi key', this.key);
  }

  finishReset() {
    console.log('.....> ', this.resetAccount.password);
    console.log('.....> ', this.confirmPassword);
    this.error = null;
    if (this.resetAccount.password !== this.confirmPassword) {
      this.error = 'password diferent of confirmation password';
    } else {
      this.resetPasswordService.finish({ key: this.key, newPassword: this.resetAccount.password }).subscribe(
        (ok) => {
          this.success = 'OK';
          // this.location.navigate(['/']);
        },
        (error) => {
          console.log('---> error  ', error.json().title);
          if (error.status === 500) {
            this.error = 'Expired key of change password';
          }
          this.success = null;
        }
      );
    }
  }

}
