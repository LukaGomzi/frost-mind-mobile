import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.router.navigate(['/tabs/home']);
      return false;
    }
    return true;
  }
}
