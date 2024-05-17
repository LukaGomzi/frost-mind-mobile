import { Component, OnDestroy, OnInit } from '@angular/core';
import { Freezer, FreezerService } from "../../core/services/freezer.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FreezersStore } from "../../state/freezer.store";
import { NotificationService } from "../../services/notification.service";

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
    private notificationsService: NotificationService,
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
      next: () => {
        this.notificationsService.success('Item taken out successfully.');
      },
      error: (err) => {
        console.error('Failed to take item out', err);
        this.notificationsService.error('Failed to take item out. Please try again.');
      }
    });
  }

  disposeItem(itemId: number, freezerId: number) {
    this.freezersStore.disposeItem(freezerId, itemId, 1).subscribe({
      next: () => {
        this.notificationsService.success('Item disposed of successfully.');
      },
      error: (err) => {
        console.error('Failed to dispose item', err);
        this.notificationsService.error('Failed to dispose item. Please try again.');
      }
    });
  }

  navigateToManageFreezerAccess(freezerId: number): void {
    this.router.navigateByUrl(`/freezer-details/${freezerId}/manage-freezer-access`);
  }

  loadFreezer(freezerId: number): void {
    this.subscription.add(
      this.freezersStore.getFreezerById(freezerId).subscribe({
        next: (freezer) => {
          this.freezer = freezer;
        },
        error: (err) => {
          console.error('Failed to load freezer', err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
