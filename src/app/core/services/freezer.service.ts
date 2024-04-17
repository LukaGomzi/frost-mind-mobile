import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FreezerItem, FreezerItemRequest } from "../models/freezer-item.model";

export interface FoodItem {
  id: number;
  name: string;
  description?: string;
  weight?: number;
  quantity?: number;
  expirationDate: string;
  foodTypeId: number;
}

export interface Freezer {
  id: number;
  name: string;
  created_at: string;
  foodItems: FoodItem[];
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

  getFreezerById(id: number): Observable<Freezer> {
    return this.http.get<Freezer>(this.baseUrl + id)
  }

  addFreezer(freezer: { name: string }): Observable<any> {
    return this.http.post(this.baseUrl, freezer);
  }

  deleteFreezer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`);
  }

  addItemToFreezer(freezerId: number, item: FreezerItemRequest): Observable<FreezerItem> {
    return this.http.post<FreezerItem>(`${this.baseUrl}${freezerId}/item`, item);
  }
}
