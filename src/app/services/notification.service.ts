import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private toastCtrl: ToastController,
  ) {}

  async presentToast(message: string, duration: number, position: any, color: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, duration,  position, color });
    toast.present();
  }

  success(message: string): void {
    this.presentToast(message, 3000, 'top', 'success');
  }

  error(message: string): void {
    this.presentToast(message, 3000, 'top', 'danger')
  }
}
