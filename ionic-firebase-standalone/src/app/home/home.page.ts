import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonButton,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _toastService: ToastService = inject(ToastService);

  logout(): void {
    this._authService
      .signOut()
      .then(async () => {
        await this._toastService.createAndPresentToast(
          'Sesión cerrada correctamente'
        );
        this._router.navigate(['./login-page']);
      })
      .catch(async () => {
        console.error('Error al cerrar sesión:');
        await this._toastService.createAndPresentToast(
          'Ha ocurrido un error, vuelve a intentarlo',
          true
        );
      });
  }
}
