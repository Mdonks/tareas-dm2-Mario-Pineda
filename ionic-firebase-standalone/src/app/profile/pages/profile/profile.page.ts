import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dtos/user';
import { Camera, CameraResultType } from '@capacitor/camera';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  LoadingController,
  IonSpinner,
  IonNote,
  IonItem,
  IonLabel,
  IonImg,
  IonSkeletonText,
  IonInput,
  IonIcon,
} from '@ionic/angular/standalone';

import { CloudinaryDtos } from 'src/app/shared/dtos/cloudinary_model';
import { CloudinaryResponseDto } from 'src/app/shared/dtos/cloudinary_response';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonInput,
    IonImg,
    IonLabel,
    IonItem,
    IonNote,
    IonSpinner,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSkeletonText,
    ReactiveFormsModule,
  ],
})
export class ProfilePage implements OnInit {
  private readonly _cloudinatyService: CloudinaryService =
    inject(CloudinaryService);
  private readonly _userService: UserService = inject(UserService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _toastService: ToastService = inject(ToastService);
  private readonly _router: Router = inject(Router);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _loadingController: LoadingController =
    inject(LoadingController);
  imageUrl: string = 'assets/images/user.png';
  loading: HTMLIonLoadingElement | null = null;
  loaded: boolean = true;
  profileForm: FormGroup = this._formBuilder.group({
    uid: [''],
    photoURL: [''],
    lastName: ['', [Validators.required]],
    dni: ['', [Validators.pattern('^[0-9]{13}$')]],
    bDay: ['', Validators.required],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern('^[0-9]{8}$')]],
  });
  spinner: boolean = false;

  get isNameRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('name');
    return control ? control.touched && control.hasError('required') : false;
  }

  get isLastNameRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('lastName');
    return control ? control.touched && control.hasError('required') : false;
  }

  get isFechaNacimientoRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('birthdate');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isDniRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('dni');
    return control ? control.touched && control.hasError('required') : false;
  }

  get isDnilInvalid(): boolean {
    const control: AbstractControl | null = this.profileForm.get('dni');
    return control ? control.touched && control.hasError('pattern') : false;
  }

  get isPhoneValid(): boolean {
    const control: AbstractControl | null = this.profileForm.get('phone');
    return control ? control.touched && control.hasError('pattern') : false;
  }

  get isFormInvalid(): boolean {
    return this.profileForm.invalid;
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

  //metodo para guardar cambios
  async save(): Promise<void> {
    if (this.isFormInvalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.showLoading();
    const user: UserDto = this.profileForm.value as UserDto;
    const timestamp = new Date().getTime();
    const model: CloudinaryDtos = {
      folder: 'users',
      fileName: `${user.uid}-${timestamp}`,
      file: this.imageUrl,
    };

    this._cloudinatyService.uploadImage(model).subscribe({
      next: async (response: CloudinaryResponseDto) => {
        user.photoURL = response.secure_url;
        this._userService.updateUser(user);
        await this._toastService.createAndPresentToast(
          'Perfil actualizado correctamente'
        );
        await this.closeLoading();
      },
      error: async (e) => {
        this.closeLoading();
        await this._toastService.createAndPresentToast(
          'Ha ocurrido un error, vuelve a intentar actualizar tu perfil',
          true
        );
        await this.closeLoading();
      },
    });
  }

  ionViewWillEnter() {
    this.loadUserData();
  }

  ngOnInit() {}

  private loadUserData() {
    this._userService
      .getUserById()
      .then((user: UserDto | null) => {
        this.imageUrl = user?.photoURL || this.imageUrl;
        this.profileForm.patchValue({
          uid: user?.uid || '',
          name: user?.name || ' ',
          lastName: user?.lastName || '',
          email: user?.email || '',
          dni: user?.dni || '',
          bDay: user?.bDay || '',
          phone: user?.phone || '',
          photoURL: user?.photoURL || '',
        });
        this.loaded = false;
      })
      .catch(async (error: string) => {
        await this._toastService.createAndPresentToast(error, true);
      });
  }

  async selecImage(): Promise<void> {
    const camera = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      saveToGallery: true,
      promptLabelHeader: 'Seleccionar una opcion',
      promptLabelPicture: 'Tomar una foto',
      promptLabelPhoto: 'Elegir de galera',
    });
    if (!camera) return;
    this.imageUrl =
      camera.webPath ??
      camera.path ??
      `data:image/jpg;base64,${camera.base64String ?? ''}`;
  }

  logout(): void {
    this._authService
      .signOut()
      .then(async () => {
        await this._toastService.createAndPresentToast(
          'Sesión cerrada correctamente'
        );
        this._router.navigate(['./login-page']);
        this.profileForm.reset();
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
