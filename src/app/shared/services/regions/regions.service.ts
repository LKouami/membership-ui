import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config';
import { Region } from '../../models/region';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(private http: HttpClient) { }

  private baseUrl = config.baseUrl + 'api/v1/Regions';

  getRegions() {
    return this.http.get(`${this.baseUrl}`);
  }

  addRegion(region: Region) {
    return this.http.post(`${this.baseUrl}`, region)
  }

  editRegion(region: Region) {
    return this.http.put(`${this.baseUrl}/${region.Id}`, region)
  }

  deleteRegion(regionId: any) {
    return this.http.delete(`${this.baseUrl}/${regionId}`)
  }
}
