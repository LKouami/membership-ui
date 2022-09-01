import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from 'config';
@Injectable({
  providedIn: 'root'
})
export class PrefecturesService {
  private baseUrl = config.baseUrl + 'api/v1/Prefectures';

  constructor(private http: HttpClient) { 

  }

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
 }
}
