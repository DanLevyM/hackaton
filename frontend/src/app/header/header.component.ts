import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const expiredDate = localStorage.getItem('expiredToken');
    const currentDate = Date.now();

    this.isAuthenticated = this.auth.isAuthenticated();

    if (expiredDate) {
      if (currentDate > new Date(expiredDate).getTime()) {
        localStorage.clear();
        this.router.navigate(['']);
      }
    }
  }
}