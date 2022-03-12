import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("passwordRef", { static: true }) passwordReference: any;

  public authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  /**
   * Login user
   */
  public login(): void {
    const email = this.authForm.value?.email;
    const password = this.authForm?.value?.password;

    this.authService.login(email, password).subscribe((res: any) => {
      if (res.success) {
        this.authService.setToken('expiredToken', res.expires);
        this.authService.setToken('token', res.token);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  /**
   * Display or not password value
   */
  public changePasswordVisibility(): void {
    const type = this.passwordReference.nativeElement.type;
    if (type === 'password') {
      this.passwordReference.nativeElement.type = 'text';
    } else {
      this.passwordReference.nativeElement.type = 'password';
    }
  }
}
