import { Firestore, collection, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GalleryDTO } from '../dtos/galleries';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private firestore: Firestore) {}

  getActiveGalleries(): Observable<GalleryDTO[]> {
    const galleriesRef = collection(this.firestore, 'galleries');
    const q = query(
      galleriesRef,
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<GalleryDTO[]>;
  }
}
