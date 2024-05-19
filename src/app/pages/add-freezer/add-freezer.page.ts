import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FreezerService } from '../../core/services/freezer.service';
import { NotificationService } from "../../services/notification.service";
import { FreezersStore } from "../../state/freezer.store";

@Component({
  selector: 'app-add-freezer',
  templateUrl: './add-freezer.page.html',
  styleUrls: ['./add-freezer.page.scss'],
})
export class AddFreezerPage {
  name?: string;
  isLoading: boolean = false;

  constructor(
    private freezerService: FreezerService,
    private freezerStore: FreezersStore,
    private router: Router,
    private notificationsService: NotificationService,
  ) {}

  submit() {
    if (this.name) {
      this.isLoading = true;
      this.freezerService.addFreezer({ name: this.name }).subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationsService.success(`Freezer ${this.name} added successfully.`);
          this.freezerStore.loadFreezers();
          this.router.navigateByUrl('/tabs/home');
        },
        error: (error) => {
          this.isLoading = false;
          this.notificationsService.error('Failed to add freezer. Please try again later.');
          console.error('Error adding freezer:', error);
        },
      });
    } else {
      this.notificationsService.error('Please enter a freezer name.');
    }
  }
}
