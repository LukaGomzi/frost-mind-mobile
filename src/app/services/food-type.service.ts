import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FoodType {
  id?: number;
  name: string;
  expirationMonths: number;
  createdBy?: {
    id: number;
    username: string;
    email: string;
    created_at: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {
  private baseUrl = 'https://frost-mind.com/api/v1/food-types';

  constructor(private http: HttpClient) {}

  getFoodTypes(): Observable<FoodType[]> {
    return this.http.get<FoodType[]>(this.baseUrl);
  }

  addFoodType(foodType: FoodType): Observable<FoodType> {
    const payload = { ...foodType };
    delete payload.id;
    delete payload.createdBy;
    console.log('add fod type', payload);

    return this.http.post<FoodType>(this.baseUrl, payload);
  }

  deleteFoodType(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateFoodType(id: number, foodType: Omit<FoodType, 'id'>): Observable<FoodType> {
    return this.http.put<FoodType>(`${this.baseUrl}/${id}`, foodType);
  }
}
