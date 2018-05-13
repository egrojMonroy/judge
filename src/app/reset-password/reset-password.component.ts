import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../services/reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  }

  finishReset() {
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
          if (error.status === 500) {
            this.error = 'Expired key of change password';
          }
          this.success = null;
        }
      );
    }
  }

}
