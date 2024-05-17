import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FreezersStore } from "../../state/freezer.store";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: 'app-grant-freezer-access',
  templateUrl: './grant-freezer-access.page.html',
  styleUrls: ['./grant-freezer-access.page.scss'],
})
export class GrantFreezerAccessPage implements OnInit, OnDestroy {
  grantAccessForm: FormGroup;
  freezerId?: number;
  isLoading: boolean = false;
  private subscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private freezersStore: FreezersStore,
    private notificationsService: NotificationService,
  ) {
    this.grantAccessForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.freezerId = params['id'];
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  grantAccess() {
    if (this.grantAccessForm.valid && this.freezerId) {
      this.isLoading = true;
      const username = this.grantAccessForm.get('username')?.value;
      this.freezersStore.assignFreezerToUser(this.freezerId, username).subscribe({
        next: () => {
          this.notificationsService.success("Access granted for user " + username);
          this.isLoading = false;
          this.router.navigateByUrl(`/freezer-details/${this.freezerId}/manage-freezer-access`);
        },
        error: (err) => {
          this.notificationsService.error("Could not grant the access. Please try again later.");
          this.isLoading = false;
          console.error('Failed to grant access', err);
        }
      });
    }
  }

  getBackButtonURL(): string {
    return `/freezer-details/${this.freezerId}/manage-freezer-access`;
  }
}
