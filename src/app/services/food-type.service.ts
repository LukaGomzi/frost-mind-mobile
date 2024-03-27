import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FoodType {
  id: number;
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
  private baseUrl = 'http://localhost:3000/api/v1/food-types';

  constructor(private http: HttpClient) {}

  getFoodTypes(): Observable<FoodType[]> {
    return this.http.get<FoodType[]>(this.baseUrl);
  }
}
