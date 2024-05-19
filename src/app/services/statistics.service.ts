import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Statistics } from "../state/statistics.store";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = 'https://frost-mind.com/api/v1/statistics';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(this.baseUrl);
  }
}
