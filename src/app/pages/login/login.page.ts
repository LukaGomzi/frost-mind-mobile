import { Component } from '@angular/core';
import { setLogin } from '../../state/auth.store';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:3000/api/v1/auth/login', { username: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          setLogin(this.email, response.access_token);
          this.router.navigateByUrl('/tabs/home');
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
  }
}
