import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { FoodTypeService, FoodType } from '../services/food-type.service';
import { tap } from "rxjs"; // Adjust the import path as needed

interface FoodTypesState {
  foodTypes: FoodType[];
}

const foodTypesStore = createStore(
  { name: 'foodTypes' },
  withProps<FoodTypesState>({ foodTypes: [] })
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
    this.foodTypeService.getFoodTypes().subscribe((foodTypes) => {
      foodTypesStore.update((currentState) => ({
        ...currentState,
        foodTypes,
      }));
    });
  }

  addFoodType(foodType: Omit<FoodType, 'id'>) {
    return this.foodTypeService.addFoodType(foodType).pipe(
      tap(() => {
        this.loadFoodTypes();
      })
    );
  }

  deleteFoodType(id: number) {
    return this.foodTypeService.deleteFoodType(id).pipe(
      tap(() => {
        this.loadFoodTypes();
      })
    );
  }
}
