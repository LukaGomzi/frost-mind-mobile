import { Component, OnDestroy, OnInit } from '@angular/core';
import { Freezer, FreezerService } from "../../core/services/freezer.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FreezersStore } from "../../state/freezer.store";

@Component({
  selector: 'app-freezer-details',
  templateUrl: './freezer-details.page.html',
  styleUrls: ['./freezer-details.page.scss'],
})
export class FreezerDetailsPage implements OnInit, OnDestroy {
  freezer?: Freezer;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private freezerService: FreezerService,
    private freezersStore: FreezersStore
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        const freezerId = params['id'];
        if (freezerId) {
          this.loadFreezer(freezerId);
        }
      })
    );
  }

  addNewItemToFreezer(freezerId: number): void {
    this.router.navigateByUrl('/freezer-details/' + freezerId + '/new-item');
  }

  private loadFreezer(freezerId: number): void {
    this.subscription.add(
      this.freezersStore.getFreezerById(freezerId).subscribe(freezer => {
        this.freezer = freezer;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
