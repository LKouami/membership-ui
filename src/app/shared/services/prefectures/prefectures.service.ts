import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PrefecturesService {
  private baseUrl = 'https://membershipmanager.azurewebsites.net/api/v1/Prefectures';

  constructor(private http: HttpClient) { 

  }

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
 }
}
