import { Component, OnDestroy, OnInit } from '@angular/core';
import { Freezer, FreezerService } from "../../core/services/freezer.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { getFreezerByFreezerId } from "../../state/freezer.store";

@Component({
  selector: 'app-freezer-details',
  templateUrl: './freezer-details.page.html',
  styleUrls: ['./freezer-details.page.scss'],
})
export class FreezerDetailsPage implements OnInit, OnDestroy {
  freezer?: Freezer;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private freezerService: FreezerService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        const freezerId = params['id'];
        if (freezerId) {
          this.loadFoodItems(freezerId);
        }
      })
    );
  }

  private loadFoodItems(freezerId: number): void {
    this.subscription.add(
      getFreezerByFreezerId(freezerId, this.freezerService).subscribe(foodItems => {
        this.freezer = foodItems;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
