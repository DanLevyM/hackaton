import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: boolean = false;
  public isVisible: boolean = false;
  public disabledNavbar: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const expiredDate = localStorage.getItem('expiredToken');
    const currentDate = Date.now();

    this.router.events.subscribe((data: any) => {
      this.isAuthenticated = this.auth.isAuthenticated();
      this.disabledNavbar = (!this.isAuthenticated && this.router.url.indexOf('login') === -1);

      if (data instanceof RoutesRecognized) {
        this.isVisible = data?.state?.root?.firstChild?.data?.['header'];
      }
    });

    this.isAuthenticated = this.auth.isAuthenticated();

    if (expiredDate) {
      if (currentDate > new Date(expiredDate).getTime()) {
        localStorage.clear();
        this.router.navigate(['']);
      }
    }
  }
}