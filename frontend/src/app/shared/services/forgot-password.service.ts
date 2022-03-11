import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private URL: string = 'http://localhost:5001/';

  constructor(private http: HttpClient) { }

  /**
   * Send forgot password email
   * @param email Email of user
   * @returns Observable of response .. email sending or not
   */
  public sendForgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.URL}api/v1/user/forgotpassword`, {
      email
    });
  }
}