import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonCardContent,IonCard,IonLabel,IonItem,IonList,IonHeader,IonToolbar,IonTitle,IonContent,IonButton,} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import {ActionPerformed,PushNotifications,PushNotificationSchema,Token,} from '@capacitor/push-notifications';
import { UserDto } from 'src/app/profile/dtos/user';
import { UserService } from 'src/app/profile/services/user.service';
import { HomeServicesService } from '../services/home-service.service';
import { PhotoDto } from '../dtos/photo';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonCardContent,IonCard,IonButton,CommonModule,FormsModule,IonHeader,IonToolbar,IonTitle,IonContent,IonLabel,IonItem,IonList],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _toastService: ToastService = inject(ToastService);
  user: UserDto | null = null;
  private readonly _userService: UserService= inject(UserService)
  full_name:string = '';
  private readonly _homeSerive: HomeServicesService = inject(HomeServicesService)
  photos: PhotoDto[] = [];
  
  initNotifications(): void {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      if (this.user) {
        this.user.fcmToken = token.value;
        this._userService.updateUser(this.user);
      }
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ', notification);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ', notification);
      }
    );
  }
  ngOnInit() {
    this._userService
      .getUserById()
      .then((user: UserDto | null) => {
        this.user = user;
        this.initNotifications();
        this.full_name = `${user?.name} ${user?.lastName}`;
        //console.log('User data:', user);
      })
      .catch(async (error: string) => {
        await this._toastService.createAndPresentToast(error, true);
      });
      this._homeSerive.getPhotos().subscribe({
        next: (photos: PhotoDto[]) => {
          this.photos = photos;
          console.log('Photos loaded:', this.photos);
        },
        error: async () => {
          await this._toastService.createAndPresentToast(
            'Ha ocurrido un error, vuelve a intentarlo',
            true
          );
        },
      });
  }
}


