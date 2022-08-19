import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../../models/member';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
private baseUrl = 'https://membershipmanager.azurewebsites.net/api/v1/Members';

  constructor(private http: HttpClient) { 

  }

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
 }
}
