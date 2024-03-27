import { Component, OnDestroy, OnInit } from '@angular/core';
import { Freezer, FreezerService } from "../core/services/freezer.service";
import { Subscription } from "rxjs";
import { freezers$, updateFreezers } from "../state/freezer.store";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

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
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.fetchFreezers();
    this.subscription.add(freezers$.subscribe(data => this.freezers = data));
  }

  fetchFreezers() {
    this.freezerService.getFreezers().subscribe(freezers => {
      updateFreezers(freezers);
    });
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
          this.fetchFreezers();
        },
        error: (error) => {
          console.error('Error deleting freezer:', error);
        },
      })
    );
  }

  openFreezer(freezer: Freezer) {
    console.log('Open freezer', freezer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
