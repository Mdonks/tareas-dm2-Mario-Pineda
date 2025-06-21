import { inject, Injectable, Injector } from '@angular/core';
import {
  collection,
  Firestore,
  doc,
  setDoc,
  DocumentReference,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { RegisterDto } from 'src/app/auth/dtos/register';
import { UserDto } from '../dtos/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '@angular/fire/auth';

const COLLECTION_NAME: string = 'users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _fireStore: Firestore = inject(Firestore);
  private readonly _collection = collection(this._fireStore, COLLECTION_NAME);

  createNewUser(register: RegisterDto) {
    const userRef: DocumentReference = doc(this._collection, register.uid);
    return setDoc(userRef, {
      uid: register.uid,
      name: register.name,
      lastName: register.lastName,
      email: register.email,
      phone: register.phone || '',
      bDay: register.bDay || '',
      dni: register.dni || '',
    });
  }

  async getUserById(): Promise<UserDto | null> {
    try {
      const user: User | null = await this._authService.getCurrentUser();
      const userRef: DocumentReference = doc(this._collection, user?.uid || '');
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data() as UserDto;
      }
      return null;
    } catch (error) {
      throw 'Error al obtener el usuario, intentelo de nuevo';
    }
  }

  updateUser(register: UserDto) {
    const userRef: DocumentReference = doc(this._collection, register.uid);
    return updateDoc(userRef, {
      email: register.email,
      phone: register.phone || '',
      photoURL: register.photoURL || '',
      dni: register.dni || '',
      bDay: register.bDay || '',
      name: register.name || '',
      lastName: register.lastName || '',
      fcmToken: register.fcmToken || '',
    });
  }
}
