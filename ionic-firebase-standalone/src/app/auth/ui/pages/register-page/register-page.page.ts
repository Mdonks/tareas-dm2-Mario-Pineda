import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { person, mail, key, idCard, call } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonButton,
  IonIcon,
  LoadingController,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RegisterDto } from 'src/app/auth/dtos/register';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { FirebaseAuthResponse } from 'src/app/auth/dtos/firebase-auth-response';
addIcons({
  person: person,
  mail: mail,
  key: key,
  'id-card': idCard,
  call: call,
});

export interface User {
  Nombre: string;
  Apellido: string;
  email: string;
  password: string;
  dni: string;
  phone: number;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonNote,
    IonButton,
    IonIcon,
  ],
})
export class RegisterPagePage {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _loadingController: LoadingController =
    inject(LoadingController);
  private readonly _toastService: ToastService = inject(ToastService);
  loading: HTMLIonLoadingElement | null = null;

  constructor() {
    addIcons({ person, mail, key, idCard, call });
  }

  registerForm: FormGroup = this._formBuilder.group({
    Nombre: ['', Validators.required],
    Apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    dni: ['', [Validators.required, Validators.pattern(/^\d{13,}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{8,}$/)]],
  });

  spinner: boolean = false;

  get isNombreRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('Nombre');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isApellidoRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('Apellido');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('email');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isEmailValid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isPassWordRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('password');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isDniRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('dni');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isDniValid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('dni');
    return control ? control.hasError('pattern') && control.touched : false;
  }

  get isPhoneRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('phone');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isPhoneValid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('phone');
    return control ? control.hasError('pattern') && control.touched : false;
  }get isFormInvalid(): boolean {
    return this.registerForm.invalid;
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

  singUp(): void {
    if (this.isFormInvalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.showLoading();
    //this.spinner = true;
    const register: RegisterDto = this.registerForm.value as RegisterDto;
    this._authService
      .createUserWithEmailAndPassword(register)
      .then(async (response: FirebaseAuthResponse) => {
        await this.closeLoading();
        await this._toastService.createAndPresentToast(
          response.message ?? '¡Registro Exitoso!',
          false
        );
        this._router.navigate(['/home']);
      })
      .catch(async (error: string) => {
        await this.closeLoading();
        await this._toastService.createAndPresentToast(error, true);
      });
  }
}
