import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { logout } from '../state/auth.store';
import { FreezersStore } from "../state/freezer.store";
import { StatisticsStore } from "../state/statistics.store";
import { FoodTypeStore } from "../state/food-type.store";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(
    private router: Router,
    private freezerStore: FreezersStore,
    private statisticsStore: StatisticsStore,
    private foodTypeStore: FoodTypeStore,
  ) {}

  logout() {
    logout();
    this.freezerStore.reset();
    this.statisticsStore.reset();
    this.foodTypeStore.reset();
    this.router.navigateByUrl('/login');
  }
}
