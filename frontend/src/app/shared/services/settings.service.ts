import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private URL: string = 'http://localhost:5001/';

  constructor(private http: HttpClient) { }

  /**
   * Get current users
   * @returns Observable of user informations
   */
  public getCurrentUser(): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    return this.http.get(`${this.URL}api/v1/user/me`, {
      headers: {
        Authorization: token
      }
    });
  }

  /**
   * Update user settings
   * @param data User data
   */
  public updateUserSettings(data: any): any {
    const token = 'Bearer ' + localStorage.getItem('token');

    // TODO enhance below to avoid mistake
    const body: any = {
      currentPassword: data.newPassword,
      newPassword: data.password
    };

    return this.http.put(`${this.URL}api/v1/user/updatepassword`, body, {
      headers: {
        Authorization: token
      }
    });
  }
}
