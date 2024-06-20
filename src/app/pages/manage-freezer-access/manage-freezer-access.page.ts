import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { first, Observable, of, Subscription, take } from "rxjs";
import { FreezersStore } from "../../state/freezer.store";
import { FreezerUser } from "../../core/services/freezer.service";
import { AlertController } from "@ionic/angular";
import { NotificationService } from "../../services/notification.service";

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
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private freezerStore: FreezersStore,
    private alertController: AlertController,
    private notificationsService: NotificationService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.freezerId = params['id'];
        this.loadFreezerUsers();
      })
    );

    this.subscription.add(
      this.freezerStore.getError().subscribe(error => {
        this.error = error;
      })
    );
  }

  loadFreezerUsers(event?: any): void {
    if (this.freezerId) {
      this.usersWithAccess$ = this.freezerStore.getFreezerUsers(this.freezerId);

      if (event) {
        this.isLoading$.subscribe(isLoading => {
          if (!isLoading) {
            event.target.complete();
          }
        })
      }
    }
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
          this.notificationsService.success(`Removed access for user ${username}`);
          this.usersWithAccess$ = this.freezerStore.getFreezerUsers(this.freezerId!);
        },
        error: (err) => {
          this.notificationsService.error("Could not remove the access. Try again later.")
          console.error('Failed to remove access', err)
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
