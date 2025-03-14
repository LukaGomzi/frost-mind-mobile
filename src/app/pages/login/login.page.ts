import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FreezersStore } from '../../state/freezer.store';
import { FoodTypeStore } from '../../state/food-type.store';
import { NotificationService } from '../../services/notification.service';
import { setLogin } from "../../state/auth.store";
import { StatisticsStore } from "../../state/statistics.store";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private freezerStore: FreezersStore,
    private foodTypeStore: FoodTypeStore,
    private notificationService: NotificationService,
    private statisticsStore: StatisticsStore,
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.notificationService.error('Please fill in both username and password.');
      return;
    }

    this.isLoading = true;
    this.http.post<any>('https://frost-mind-api.vercel.app/api/v1/auth/login', { username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          setLogin(this.username, response.access_token, response.refresh_token);
          this.notificationService.success('Login successful!');
          this.router.navigateByUrl('/tabs/home');
        },
        error: (exception) => {
          this.isLoading = false;
          if (exception.error.message == 'Unauthorized') {
            this.notificationService.error('Password is incorrect. Please try again.');
            this.password = '';
          } else {
            this.notificationService.error(exception.error.message);
          }
          console.error('There was an error: ' + exception.message)
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
