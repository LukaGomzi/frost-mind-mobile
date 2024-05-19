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

export interface FreezerUser {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class FreezerService {
  private baseUrl = 'https://frost-mind-api.vercel.app/api/v1/freezers/';

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

  takeItemOutOfFreezer(freezerId: number, itemId: number, quantity?: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${freezerId}/item/take-out`, { itemId, quantity });
  }

  disposeItemInFreezer(freezerId: number, itemId: number, quantity?: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${freezerId}/item/dispose-item`, { itemId, quantity });
  }

  assignFreezerToUser(freezerId: number, username: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${freezerId}/users/${username}`, undefined);
  }

  removeUserFromFreezer(freezerId: number, username: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${freezerId}/users/${username}`);
  }

  loadFreezerUsers(freezerId: number): Observable<FreezerUser[]> {
    return this.http.get<FreezerUser[]>(`${this.baseUrl}${freezerId}/users`);
  }
}
