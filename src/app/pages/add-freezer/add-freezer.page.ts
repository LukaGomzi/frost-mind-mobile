import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FreezerService } from '../../core/services/freezer.service';

@Component({
  selector: 'app-add-freezer',
  templateUrl: './add-freezer.page.html',
  styleUrls: ['./add-freezer.page.scss'],
})
export class AddFreezerPage {
  name?: string;

  constructor(private freezerService: FreezerService, private router: Router) {}

  submit() {
    if (this.name) {
      this.freezerService.addFreezer({ name: this.name }).subscribe({
        next: () => {
          this.router.navigateByUrl('/tabs/home');
        },
        error: (error) => {
          console.error('Error adding freezer:', error);
        },
      });
    }
  }
}
