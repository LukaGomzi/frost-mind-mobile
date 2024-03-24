import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { logout } from '../state/auth.store';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private router: Router) {}

  logout() {
    logout();
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
  }

}
