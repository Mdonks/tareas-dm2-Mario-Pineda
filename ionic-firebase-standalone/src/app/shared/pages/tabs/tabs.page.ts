import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonLabel,
  IonTabs,
  IonTabBar,
  IonTabButton,
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonTabs, IonTabBar, IonTabButton],
})
export class TabsPage {

}