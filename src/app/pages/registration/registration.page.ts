import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;

  constructor(private http: HttpClient, private router: Router, private toastController: ToastController) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.presentToast('Passwords do not match.');
      return;
    }

    const registerUrl = 'http://localhost:3000/api/v1/user/register';
    this.http.post(registerUrl, {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.presentToast('Registration successful. Please log in.');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.presentToast('Registration failed.');
      }
    });
  }
}
