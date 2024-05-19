import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {}

  register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.notificationService.error('All fields are required.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.notificationService.error('Passwords do not match.');
      return;
    }

    this.isLoading = true;

    const registerUrl = 'https://frost-mind.com/api/v1/user/register';
    this.http.post(registerUrl, {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.notificationService.success('Registration successful. Please log in.');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration failed', error);
        this.notificationService.error('Registration failed: ' + (error.error?.message || error.message));
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
