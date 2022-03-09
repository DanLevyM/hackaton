import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL: string = 'http://localhost:5001/';

  constructor(private http: HttpClient) { }

  /**
   * Login user
   * @param email Email of user
   * @param password Password of user
   * @returns Observable of authentication response
   */
  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.URL}api/v1/user/login`, {
      email,
      password
    });
  }
}
