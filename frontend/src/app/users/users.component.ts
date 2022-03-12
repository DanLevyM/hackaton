import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Logout user
   */
  public logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}