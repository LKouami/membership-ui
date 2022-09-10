import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config';
import { Member } from '../../models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  private baseUrl = config.baseUrl + 'api/v1/Members';

  getMembers() {
    return this.http.get(`${this.baseUrl}`);
  }

  addMember(member: Member) {
    return this.http.post(`${this.baseUrl}`, member)
  }

  editMember(member: Member) {
    return this.http.put(`${this.baseUrl}/${member.Id}`, member)
  }

  deleteMember(memberId: any) {
    return this.http.delete(`${this.baseUrl}/${memberId}`)
  }
}
