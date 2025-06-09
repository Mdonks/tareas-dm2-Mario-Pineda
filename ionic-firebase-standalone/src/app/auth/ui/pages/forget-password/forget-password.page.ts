import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonItem,
  IonNote,
  IonButton,
  LoadingController,
} from '@ionic/angular/standalone';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonInput,
    IonLabel,
    IonItem,
    ReactiveFormsModule,
    IonNote,
  ],
})
export class ForgetPasswordPage {
  private readonly _formBUilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _toastService: ToastService = inject(ToastService);
  private readonly _router: Router = inject(Router);
  private readonly _loadingController: LoadingController =
    inject(LoadingController);
  loading: HTMLIonLoadingElement | null = null;

  loginForm: FormGroup = this._formBUilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.loginForm.get('email');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isEmailValid(): boolean {
    const control: AbstractControl | null = this.loginForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

  async closeLoading(): Promise<void> {
    await this.loading?.dismiss();
  }

  async showLoading(): Promise<void> {
    this.loading = await this._loadingController.create({
      message: 'Cargando...',
      mode: 'ios',
      spinner: 'dots',
    });
    await this.loading.present();
  }

  async onResetPassword() {
    try {
      const email = this.loginForm.value;
      this.showLoading();
      await this._authService.resetPassword(email.email);
      await this._toastService.createAndPresentToast(
        'Te hemos enviado un correo para restablecer tu contraseña.'
      );
      this.closeLoading();
      this._router.navigate(['/login-page']);
    } catch (error) {
      this.closeLoading();
      await this._toastService.createAndPresentToast(
        'Ocurrió un error, verifica bien la direccion del correo!',
        true
      );
    }
  }
}
