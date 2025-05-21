import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { IonButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { removeCircleOutline, addCircleOutline } from 'ionicons/icons';

// Registra los iconos que vas a usar
addIcons({
  'remove-circle-outline': removeCircleOutline,
  'add-circle-outline': addCircleOutline,
});

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  quantity: number = 1;

  constructor(private alertController: AlertController) {}

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  async orderProduct() {
    const alert = await this.alertController.create({
      header: 'Producto agregado',
      message: 'Ha agregado correctamente el producto a su carrito',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}

