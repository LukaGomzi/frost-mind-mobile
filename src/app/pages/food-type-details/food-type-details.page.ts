// In food-type-details.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodType } from "../../services/food-type.service";
import { FoodTypeStore } from "../../state/food-type.store";

@Component({
  selector: 'app-food-type-details',
  templateUrl: './food-type-details.page.html',
  styleUrls: ['./food-type-details.page.scss'],
})
export class FoodTypeDetailsPage implements OnInit {
  foodType?: FoodType;
  private id?: number;

  constructor(
    private foodTypeStore: FoodTypeStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.foodTypeStore.getFoodTypeById(this.id).subscribe((data: FoodType | undefined) => {
        if (data) {
          this.foodType = { ...data };
        } else {
          this.router.navigateByUrl('/manage-food-types');
        }
      });
    } else {
      this.router.navigateByUrl('/manage-food-types');
    }
  }


  save() {
    if (this.id && this.foodType?.createdBy) {
      this.foodTypeStore.updateFoodType(this.id, this.foodType!).subscribe(() => {
        this.router.navigateByUrl('/manage-food-types');
      });
    } else {
      this.foodTypeStore.addFoodType(this.foodType!).subscribe(() => {
        this.router.navigateByUrl('/manage-food-types');
      });
    }
  }
}
