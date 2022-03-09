import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
        this.authService.setToken(res.token);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
