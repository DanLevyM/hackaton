import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private URL: string = 'http://localhost:5001/';

  constructor(private http: HttpClient) { }

  /**
   * Contact user
   * @param name User name
   * @param email User email
   * @param company User company
   * @param number User number
   * @param message User message
   * @param isTester Asking for testing or not
   * @returns Observable of response contact
   */
  public contactUser(name: string, email: string, company: string, number: string, message: string, isTester: string): Observable<any> {
    return this.http.post(`${this.URL}api/v1/user/askRegister`, {
      name,
      email,
      company,
      phone: number,
      message,
      role: isTester
    });
  }
}
