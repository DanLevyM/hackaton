import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ForgotPasswordService } from '../shared/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  /**
   * Send forgot password email
   */
  public sendForgotPassword(): void {
    const email = this.forgotPasswordForm.value?.email;
    this.forgotPasswordService.sendForgotPassword(email).subscribe((res: any) => {
      if (res?.success) {
        this.router.navigate(['/login']);
      }
    });
  }

}
