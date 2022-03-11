import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private URL: string = 'http://localhost:5001/';

  constructor(private http: HttpClient) { }

  /**
   * Get excel file data
   * @param form Form element
   * @returns Observable of excel file data
   */
  public getExcelFileData(form: any): Observable<any> {
    const formData = new FormData(form);
    return this.http.post(`${this.URL}api/v1/xlsx/post`, formData);
  }
}
