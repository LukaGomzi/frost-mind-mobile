import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { logout } from '../state/auth.store';
import { FreezersStore } from "../state/freezer.store";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private router: Router, private freezerStore: FreezersStore) {}

  logout() {
    logout();
    this.freezerStore.reset();
    this.router.navigateByUrl('/login');
  }
}
