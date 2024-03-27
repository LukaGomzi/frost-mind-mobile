import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Freezer {
  id: number;
  name: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class FreezerService {
  private baseUrl = 'http://localhost:3000/api/v1/freezers/';

  constructor(private http: HttpClient) {}

  getFreezers(): Observable<Freezer[]> {
    return this.http.get<Freezer[]>(this.baseUrl);
  }

  addFreezer(freezer: { name: string }): Observable<any> {
    return this.http.post(this.baseUrl, freezer);
  }

  deleteFreezer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
