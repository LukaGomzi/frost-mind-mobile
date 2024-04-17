import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { FoodType } from "../../services/food-type.service";
import { FoodTypeStore } from "../../state/food-type.store";
import { ActivatedRoute, Router } from "@angular/router";
import { FreezersStore } from "../../state/freezer.store";
import { FreezerItemRequest } from "../../core/models/freezer-item.model";

@Component({
  selector: 'app-freezer-new-item',
  templateUrl: './freezer-new-item.page.html',
  styleUrls: ['./freezer-new-item.page.scss'],
})
export class FreezerNewItemPage implements OnInit {
  newItemForm: FormGroup;
  freezerId?: number;
  foodTypes$?: Observable<FoodType[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodTypeStore: FoodTypeStore,
    private freezersStore: FreezersStore,
  ) {
    this.newItemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
      weight: new FormControl(''),
      foodTypeId: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.freezerId = +params['id'];
    });
    this.foodTypes$ = this.foodTypeStore.getFoodTypes();
  }

  onSubmit() {
    if (this.newItemForm.valid) {
      const itemRequest = {
        ...this.newItemForm.value,
        freezerId: this.freezerId
      };
      this.freezersStore.addItemToFreezer(this.freezerId!, itemRequest).subscribe({
        next: _ => {
          this.router.navigateByUrl('/freezer-details/' + this.freezerId!);
        },
        error: (error) => {
          console.error('Failed to add item', error);
        }
      });
    }
  }
}
