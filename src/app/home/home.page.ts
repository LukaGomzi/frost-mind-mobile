import { Component, OnDestroy, OnInit } from '@angular/core';
import { Freezer, FreezerService } from "../core/services/freezer.service";
import { Subscription } from "rxjs";
import { freezers$, updateFreezers } from "../state/freezer.store";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  freezers: Freezer[] = [];
  private subscription = new Subscription();

  constructor(private freezerService: FreezerService) {}

  ngOnInit() {
    this.fetchFreezers();
    this.subscription.add(freezers$.subscribe(data => this.freezers = data));
  }

  fetchFreezers() {
    this.freezerService.getFreezers().subscribe(freezers => {
      updateFreezers(freezers);
    });
  }

  addNewFreezer() {
    console.log('Add new freezer')
  }

  openFreezer(freezer: Freezer) {
    console.log('Open freezer', freezer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
