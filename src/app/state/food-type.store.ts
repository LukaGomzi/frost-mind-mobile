import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { FoodTypeService, FoodType } from '../services/food-type.service'; // Adjust the import path as needed

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
}
