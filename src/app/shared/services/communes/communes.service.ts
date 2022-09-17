import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config';
import { Commune } from '../../models/commune';

@Injectable({
  providedIn: 'root'
})
export class CommunesService {

  constructor(private http: HttpClient) { }

  private baseUrl = config.baseUrl + 'api/v1/Communes';

  getCommunes() {
    return this.http.get(`${this.baseUrl}`);
  }

  addCommune(commune: Commune) {
    return this.http.post(`${this.baseUrl}`, commune)
  }

  editCommune(commune: Commune) {
    return this.http.put(`${this.baseUrl}/${commune.Id}`, commune)
  }

  deleteCommune(communeId: any) {
    return this.http.delete(`${this.baseUrl}/${communeId}`)
  }
}
