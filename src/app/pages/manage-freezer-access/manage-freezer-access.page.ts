import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-manage-freezer-access',
  templateUrl: './manage-freezer-access.page.html',
  styleUrls: ['./manage-freezer-access.page.scss'],
})
export class ManageFreezerAccessPage implements OnInit, OnDestroy {
  usersWithAccess: string[] = ['user1', 'user2', 'user3'];
  freezerId?: number;
  private subscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.freezerId = params['id'];
    });
  }

  navigateToGrantAccess() {
    this.router.navigateByUrl(`/freezer-details/${this.freezerId}/grant-freezer-access`);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
