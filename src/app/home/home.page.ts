import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Freezer, FreezerService } from "../core/services/freezer.service";
import { combineLatest, first, map, Observable, Subject, takeUntil } from "rxjs";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { FreezersStore } from "../state/freezer.store";

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
  private onDestroy$ = new Subject();

  constructor(
    private freezerService: FreezerService,
    private freezersStore: FreezersStore,
    private router: Router,
    private alertController: AlertController
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

  async confirmDelete(freezerId: number) {
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
            this.deleteFreezer(freezerId);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteFreezer(freezerId: number) {
    this.freezerService.deleteFreezer(freezerId)
      .pipe(
        first(),
        takeUntil(this.onDestroy$),
      )
      .subscribe({
      next: () => {
        this.loadFreezers();
      },
      error: (error) => {
        console.error('Error deleting freezer:', error);
      },
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next(undefined);
    this.onDestroy$.complete();
  }
}
