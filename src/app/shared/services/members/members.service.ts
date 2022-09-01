import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../../models/member';
import config from 'config';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseUrl = config.baseUrl + 'api/v1/Members';

  constructor(private http: HttpClient) {

  }

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }
  editMember(member: Member): Observable<any> {
    return this.http.put(`${this.baseUrl}`, member)
  }
  addMember(member: Member): Observable<any> {
    return this.http.post(`${this.baseUrl}`, member)
  }
  deleteMember(member: Member): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${member.Id}`)
  }
  
}
