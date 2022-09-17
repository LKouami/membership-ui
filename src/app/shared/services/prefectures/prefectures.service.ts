import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config';
import { Prefecture } from '../../models/prefecture';

@Injectable({
  providedIn: 'root'
})
export class PrefecturesService {

  constructor(private http: HttpClient) { }

  private baseUrl = config.baseUrl + 'api/v1/Prefectures';

  getPrefectures() {
    return this.http.get(`${this.baseUrl}`);
  }

  addPrefecture(prefecture: Prefecture) {
    return this.http.post(`${this.baseUrl}`, prefecture)
  }

  editPrefecture(prefecture: Prefecture) {
    return this.http.put(`${this.baseUrl}/${prefecture.Id}`, prefecture)
  }

  deletePrefecture(prefectureId: any) {
    return this.http.delete(`${this.baseUrl}/${prefectureId}`)
  }
}
