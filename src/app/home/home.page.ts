import { Component, OnDestroy, OnInit } from '@angular/core';
import { Freezer, FreezerService } from "../core/services/freezer.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { FreezersStore } from "../state/freezer.store";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  freezers: Freezer[] = [];
  private subscription = new Subscription();

  constructor(
    private freezerService: FreezerService,
    private freezersStore: FreezersStore,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadFreezers();
    this.subscription.add(this.freezersStore.getFreezers().subscribe(data => {
      this.freezers = data;
    }));
  }

  loadFreezers() {
    this.freezersStore.loadFreezers(); // No need to subscribe here; let the store manage the state
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
    this.subscription.add(
      this.freezerService.deleteFreezer(freezerId).subscribe({
        next: () => {
          this.loadFreezers();
        },
        error: (error) => {
          console.error('Error deleting freezer:', error);
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
