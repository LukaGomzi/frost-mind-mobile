import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subscription } from "rxjs";
import { FreezersStore } from "../../state/freezer.store";
import { FreezerUser } from "../../core/services/freezer.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-manage-freezer-access',
  templateUrl: './manage-freezer-access.page.html',
  styleUrls: ['./manage-freezer-access.page.scss'],
})
export class ManageFreezerAccessPage implements OnInit, OnDestroy {
  usersWithAccess$: Observable<FreezerUser[]> = of([]);
  freezerId?: number;
  error?: string;
  isLoading$ = this.freezerStore.isLoading();
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private freezerStore: FreezersStore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.freezerId = params['id'];
      if (this.freezerId) {
        this.usersWithAccess$ = this.freezerStore.getFreezerUsers(this.freezerId);
      }
    });

    this.subscription.add(
      this.freezerStore.getError().subscribe(error => {
        this.error = error;
      })
    );
  }

  navigateToGrantAccess() {
    this.router.navigateByUrl(`/freezer-details/${this.freezerId}/grant-freezer-access`);
  }

  isCurrentUser(username: string): boolean {
    return localStorage.getItem('user_email') == username;
  }

  async confirmRemoveAccess(username: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Remove Access',
      message: `Are you sure you want to remove access for ${username}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Yes, Remove',
          handler: () => {
            this.removeAccess(username);
          }
        }
      ]
    });

    await alert.present();
  }

  removeAccess(username: string) {
    if (this.freezerId) {
      this.freezerStore.removeUserFromFreezer(this.freezerId, username).subscribe({
        next: () => {
          this.usersWithAccess$ = this.freezerStore.getFreezerUsers(this.freezerId!);
        },
        error: (err) => console.error('Failed to remove access', err)
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
