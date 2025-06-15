import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoginDto } from 'src/app/auth/dtos/login';
import { FirebaseAuthResponse } from 'src/app/auth/dtos/firebase-auth-response';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
  LoadingController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonItem,
    IonLabel,
    IonNote,
    IonText,
    ReactiveFormsModule,
  ],
})
export class LoginPagePage {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _formBUilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _loadingController: LoadingController =
    inject(LoadingController);
  loading: HTMLIonLoadingElement | null = null;
  private readonly _toastService: ToastService = inject(ToastService);

  loginForm: FormGroup = this._formBUilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.loginForm.get('email');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isEmailValid(): boolean {
    const control: AbstractControl | null = this.loginForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isPasswordRequired(): boolean {
    const control: AbstractControl | null = this.loginForm.get('password');
    return control ? control.hasError('required') && control.touched : false;
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

  goToRegister() {
    this._router.navigate(['/register-page']);
  }

  goForgotPassword() {
    this._router.navigate(['/forget-password']);
  }

  async login(): Promise<void> {
    if (this.isFormInvalid) {
      await this._toastService.createAndPresentToast(
        'No es posible iniciar sesión',
        true
      );
      return;
    }
    this.showLoading();
    const login: LoginDto = this.loginForm.value as LoginDto;
    this._authService
      .login(login)
      .then(async (response: FirebaseAuthResponse) => {
        await this._toastService.createAndPresentToast(
          response.message ?? '¡Sesión iniciada correctamente!',
          false
        );
        await this.closeLoading();
        this._router.navigate(['tabs/home']);
      })
      .catch(async (error: string) => {
        await this.closeLoading();
        console.error('error', error);
        await this._toastService.createAndPresentToast(error, true);
      });
  }

  async loginAsGuest(): Promise<void> {
    this.showLoading();
    try {
      const response = await this._authService.loginAsGuest();
      await this._toastService.createAndPresentToast(
        response.message ?? '¡Sesión iniciada como invitado!',
        false
      );
      await this.closeLoading();
      this._router.navigate(['tabs/home']); 
    } catch (error) {
      await this.closeLoading();
      console.error('Error login como invitado', error);
      await this._toastService.createAndPresentToast(error as string, true);
    }
  }
}