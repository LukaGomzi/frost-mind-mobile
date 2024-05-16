import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subscription } from "rxjs";
import { FreezersStore } from "../../state/freezer.store";
import { FreezerUser } from "../../core/services/freezer.service";

@Component({
  selector: 'app-manage-freezer-access',
  templateUrl: './manage-freezer-access.page.html',
  styleUrls: ['./manage-freezer-access.page.scss'],
})
export class ManageFreezerAccessPage implements OnInit, OnDestroy {
  usersWithAccess$: Observable<FreezerUser[]> = of([]);
  freezerId?: number;
  private subscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private freezerStore: FreezersStore) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.freezerId = params['id'];
      if (this.freezerId) {
        this.usersWithAccess$ = this.freezerStore.getFreezerUsers(this.freezerId);
      }
    });
  }

  navigateToGrantAccess() {
    this.router.navigateByUrl(`/freezer-details/${this.freezerId}/grant-freezer-access`);
  }

  isCurrentUser(username: string): boolean {
    return localStorage.getItem('user_email') == username;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
