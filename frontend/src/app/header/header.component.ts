import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const expiredDate = localStorage.getItem('expiredToken');
    const currentDate = Date.now();

    if (expiredDate) {
      if (currentDate > new Date(expiredDate).getTime()) {
        localStorage.clear();
        this.router.navigate(['']);
      }
    }
  }
}