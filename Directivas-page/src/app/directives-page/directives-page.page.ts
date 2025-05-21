import { Component, OnInit } from '@angular/core';
import { CustomStyleDirective } from '../custom-style.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem, IonList, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-directives-page',
  templateUrl: './directives-page.page.html',
  styleUrls: ['./directives-page.page.scss'],
  standalone: true,
  imports: [CustomStyleDirective, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonItem, IonList, IonInput]
})
export class DirectivesPagePage implements OnInit {

  contador: number = 0;

  incrementar() {
    this.contador += 5;
  }

  cities: string[] = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Choluteca', 'Comayagua'];
  rtn: string = "";
  valor: number = Math.random() * 100;
  colorTexto: string = '#5cb295';
  colorButton: string = 'warning';

  constructor() { }

  ngOnInit() {
  }

}
