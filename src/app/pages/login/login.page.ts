import { Component } from '@angular/core';
import { setLogin } from '../../state/auth.store';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FreezersStore } from "../../state/freezer.store";
import { FoodTypeStore } from "../../state/food-type.store";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private freezerStore: FreezersStore,
    private foodTypeStore: FoodTypeStore,
  ) {}

  login() {
    this.http.post<any>('http://localhost:3000/api/v1/auth/login', { username: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          setLogin(this.email, response.access_token, response.refresh_token);
          this.freezerStore.loadFreezers();
          this.foodTypeStore.loadFoodTypes();
          this.router.navigateByUrl('/tabs/home');
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
  }
}
