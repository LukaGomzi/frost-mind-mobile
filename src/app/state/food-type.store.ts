import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { FoodTypeService, FoodType } from '../services/food-type.service';
import { filter, map, Observable, tap } from "rxjs";

interface FoodTypesState {
  foodTypes: FoodType[];
  isLoading: boolean;
  error?: string;
}

const foodTypesStore = createStore(
  { name: 'foodTypes' },
  withProps<FoodTypesState>({ foodTypes: [], isLoading: false })
);

@Injectable({
  providedIn: 'root'
})
export class FoodTypeStore {
  constructor(private foodTypeService: FoodTypeService) {}

  getFoodTypes() {
    return foodTypesStore.pipe(select(state => state.foodTypes));
  }

  loadFoodTypes() {
    foodTypesStore.update(_ => ({
      foodTypes: [],
      isLoading: true,
      error: undefined
    }))


    this.foodTypeService.getFoodTypes().subscribe({
      next: (foodTypes) => {
        foodTypesStore.update((currentState) => ({
          ...currentState,
          foodTypes,
          isLoading: false
        }));
      },
      error: (error) => {
        foodTypesStore.update((currentState) => ({
          ...currentState,
          isLoading: false,
          error: error.message || 'Could not fetch food types.'
        }));
      }
    })
  }

  addFoodType(foodType: Omit<FoodType, 'id'>) {
    return this.foodTypeService.addFoodType(foodType).pipe(
      tap(() => {
        this.loadFoodTypes();
      })
    );
  }

  updateFoodType(id: number, foodType: FoodType) {
    return this.foodTypeService.updateFoodType(id, foodType).pipe(
      tap(() => {
        this.loadFoodTypes();
      })
    );
  }

  getFoodTypeById(id: number) {
    return this.getFoodTypes().pipe(
      map(foodTypes => foodTypes.find(ft => ft.id === id))
    );
  }

  deleteFoodType(id: number) {
    return this.foodTypeService.deleteFoodType(id).pipe(
      tap(() => {
        this.loadFoodTypes();
      })
    );
  }

  isLoading(): Observable<boolean> {
    return foodTypesStore.pipe(select(state => state.isLoading));
  }

  getError(): Observable<string | undefined> {
    return foodTypesStore.pipe(select(state => state.error));
  }

  reset(): void {
    foodTypesStore.reset();
  }
}
