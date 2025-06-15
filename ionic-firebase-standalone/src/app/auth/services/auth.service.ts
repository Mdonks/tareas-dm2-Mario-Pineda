import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  UserCredential,
  User,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { LoginDto } from '../dtos/login';
import { FirebaseAuthResponse } from '../dtos/firebase-auth-response';
import { RegisterDto } from '../dtos/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _auth: Auth = inject(Auth);

  getCurrentUser(): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      this._auth.onAuthStateChanged((user: User | null) => {
        resolve(user);
      });
    });
  }

  async isUserLoggedIn(): Promise<boolean> {
    const user: User | null = await this.getCurrentUser();
    return user !== null;
  }

  //iniciar session
  async login(model: LoginDto): Promise<FirebaseAuthResponse> {
    try {
      const isUserLoggedIn: boolean = await this.isUserLoggedIn();
      if (isUserLoggedIn) return Promise.reject('Ya has iniciado sesión');

      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this._auth,
        model.email,
        model.password
      );

      const userSplit: string[] = userCredential.user.email?.split('@') || [];
      const userName: string = userSplit[0] || 'Invitado';
      return {
        success: true,
        message: `Bienvenido/a  + ${userName}`,
      } as FirebaseAuthResponse;
    } catch (error: string | any) {
      if (error.code === 'auth/network-request-failed') {
        throw 'Verifica tu conexion de red';
      } else {
        throw 'Correo o contraseña incorrectos';
      }
    }
  }

  //registrar usuario
  async createUserWithEmailAndPassword(
    model: RegisterDto
  ): Promise<FirebaseAuthResponse> {
    try {
      const isUserLoggedIn: boolean = await this.isUserLoggedIn();
      if (isUserLoggedIn) return Promise.reject('Ya has iniciado sesión');

      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this._auth,
          model.email,
          model.password
        );

      model.role = 'tourist';
      model.uid = userCredential.user.uid;
      const userSplit: string[] = userCredential.user.email?.split('@') || [];
      const userName: string = userSplit.length > 0 ? userSplit[0] : '';
      return {
        success: true,
        message: `Bienvenido/a  + ${userName}`,
        data: model,
      } as FirebaseAuthResponse;
    } catch (error: string | any) {
      if (error.code === 'auth/email-already-in-use') {
        throw 'El correo ya está en uso, intente con otro!';
      } else {
        throw 'Ha ocurrido un error al crear el usuario';
      }
    }
  }

  // inicio de sesion invitado
  async loginAsGuest(): Promise<FirebaseAuthResponse> {
    try {
      const isUserLoggedIn: boolean = await this.isUserLoggedIn();
      if (isUserLoggedIn) return Promise.reject('Ya has iniciado sesión');
      const userCredential: UserCredential = await signInAnonymously(
        this._auth
      );
      const user = userCredential.user;
      

      return {
        success: true,
        message: `Has iniciado como Invitado, UID: ${user.uid}!`,
      };
    } catch (error: any) {
      throw 'Ha ocurrido un error al iniciar sesión como invitado';
    }
  }

  //restrablecer contrasena
  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this._auth, email);
  }

  //cerrar sesion
  async signOut(): Promise<void> {
    await signOut(this._auth);
  }
}

