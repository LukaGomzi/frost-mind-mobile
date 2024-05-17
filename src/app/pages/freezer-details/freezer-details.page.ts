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
  error?: string;
  isLoading$ = this.freezersStore.isLoading();
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private freezerService: FreezerService,
    private freezersStore: FreezersStore,
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

    this.subscription.add(
      this.freezersStore.getError().subscribe(error => {
        this.error = error
      })
    );
  }

  addNewItemToFreezer(freezerId: number): void {
    this.router.navigateByUrl('/freezer-details/' + freezerId + '/new-item');
  }

  takeItemOut(itemId: number, freezerId: number) {
    this.freezersStore.takeItemOut(freezerId, itemId, 1).subscribe({
      error: (err) => console.error('Failed to take item out', err)
    });
  }

  disposeItem(itemId: number, freezerId: number) {
    this.freezersStore.disposeItem(freezerId, itemId, 1).subscribe({
      error: (err) => console.error('Failed to dispose item', err)
    });
  }

  navigateToManageFreezerAccess(freezerId: number): void {
    this.router.navigateByUrl(`/freezer-details/${freezerId}/manage-freezer-access`);
  }

  loadFreezer(freezerId: number): void {
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
