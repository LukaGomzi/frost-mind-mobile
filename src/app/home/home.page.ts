import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Freezer, FreezerService } from "../core/services/freezer.service";
import { combineLatest, first, map, Observable, Subject, takeUntil } from "rxjs";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { FreezersStore } from "../state/freezer.store";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy {
  freezers$: Observable<Freezer[]> = this.freezersStore.getFreezers();
  isLoading$: Observable<boolean> = this.freezersStore.isLoading();
  error$: Observable<string | undefined> = this.freezersStore.getError();
  freezersWithError$ = combineLatest([this.freezers$, this.error$]).pipe(
    map(([freezers, error]) => ({ freezers, error }))
  );
  private onDestroy$ = new Subject<void>();

  constructor(
    private freezerService: FreezerService,
    private freezersStore: FreezersStore,
    private router: Router,
    private alertController: AlertController,
    private notificationsService: NotificationService,
  ) {
    this.loadFreezers();
  }

  ngOnInit() {
    this.loadFreezers();
  }

  loadFreezers() {
    this.freezersStore.loadFreezers();
  }

  addNewFreezer() {
    this.router.navigateByUrl('/add-freezer');
  }

  async confirmDelete(freezer: Freezer) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this freezer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Yes, Delete it',
          handler: () => {
            this.deleteFreezer(freezer);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteFreezer(freezer: Freezer) {
    this.freezerService.deleteFreezer(freezer.id)
      .pipe(
        first(),
        takeUntil(this.onDestroy$),
      )
      .subscribe({
      next: () => {
        this.notificationsService.success(`Freezer ${freezer.name} deleted successfully.`);
        this.loadFreezers();
      },
      error: (error) => {
        this.notificationsService.error('Failed to delete the freezer. Please try again later.');
        console.error('Error deleting freezer:', error);
      },
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
