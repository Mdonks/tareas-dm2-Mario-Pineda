import { inject, Inject ,Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  showToast(arg0: string, arg1: boolean) {
    throw new Error('Method not implemented.');
  }
  private _toastController: ToastController = inject(ToastController);
  
  async createAndPresentToast(
    message: string,
    isError: boolean = false
  ): Promise<void> {
    const toast = await this._toastController.create({
      mode: 'ios',
      position: 'bottom',
      message: message,
      duration: 3000,
      color: isError ? 'danger' : 'success',
    });
    await toast.present();
  }
}