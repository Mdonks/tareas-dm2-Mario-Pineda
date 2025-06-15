import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar ,IonGrid ,IonCard ,IonRow ,IonCol, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { GalleryDTO } from '../../dtos/galleries';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.page.html',
  styleUrls: ['./galleries.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonCard, IonRow, IonCol, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent ]
})
export class GalleriesPage implements OnInit {

  galleries: GalleryDTO[] = [];
  private readonly _galleryService:GalleryService = inject(GalleryService)
  ngOnInit(): void {
    this._galleryService.getActiveGalleries().subscribe(data => {
      this.galleries = data;
    });
  }

}
