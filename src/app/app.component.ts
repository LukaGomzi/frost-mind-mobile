import { Component, OnInit } from '@angular/core';
import { checkLoginStatus } from "./state/auth.store";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    checkLoginStatus();
  }
}
