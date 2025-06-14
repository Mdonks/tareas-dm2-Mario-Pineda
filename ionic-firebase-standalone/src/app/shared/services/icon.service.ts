import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { folder, home, homeOutline, imagesOutline, person, personCircleOutline } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor() {
    addIcons({
      home,
      folder,
      person,
    });
  }
}
