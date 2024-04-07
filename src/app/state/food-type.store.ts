import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { FoodTypeService, FoodType } from '../services/food-type.service';
import { filter, map, tap } from "rxjs";

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
}
