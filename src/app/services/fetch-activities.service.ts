import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { BoredActivity } from '../store/states/app-state';
@Injectable({
  providedIn: 'root',
})
export class FetchActivitiesService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiBaseUrl;

  fetchActivities(){
    return this.http.get<BoredActivity>(this.apiUrl);
  }
}
