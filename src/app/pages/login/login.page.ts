import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FreezersStore } from '../../state/freezer.store';
import { FoodTypeStore } from '../../state/food-type.store';
import { NotificationService } from '../../services/notification.service';
import { setLogin } from "../../state/auth.store";

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
    private notificationService: NotificationService
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.notificationService.error('Please fill in both username and password.');
      return;
    }

    this.isLoading = true;
    this.http.post<any>('http://localhost:3000/api/v1/auth/login', { username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          setLogin(this.username, response.access_token, response.refresh_token);
          this.freezerStore.loadFreezers();
          this.foodTypeStore.loadFoodTypes();
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
