import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Firebase Standalone</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button (click)="registrarUsuario()">Registrar usuario</ion-button>
      <ion-button (click)="guardarDato()">Guardar dato en Firestore</ion-button>
    </ion-content>
  `
})
export class HomePage {
  constructor(private auth: Auth, private firestore: Firestore) {}

  registrarUsuario() {
    createUserWithEmailAndPassword(this.auth, 'ejemplo@correo.com', '123456')
      .then(cred => console.log('Usuario registrado:', cred))
      .catch(err => console.error(err));
  }

  guardarDato() {
    const ref = collection(this.firestore, 'demo');
    addDoc(ref, { mensaje: 'Hola desde Ionic Standalone' })
      .then(() => console.log('Dato guardado'))
      .catch(err => console.error(err));
  }
}
