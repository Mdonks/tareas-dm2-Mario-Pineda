import { inject, Injectable } from '@angular/core';
import { PhotoDto } from '../dtos/photo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const API_URL: string = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class HomeServicesService {

 private readonly _http: HttpClient = inject(HttpClient);

 getPhotos(): Observable<PhotoDto[]> {
  return this._http.get<any>(API_URL).pipe(
    map((response) =>
      response.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        status: item.status,
        image: item.image,
        species: item.species,
      }))
    )
  );
}

  getPhotoById(id: number): Observable<PhotoDto> {
    return this._http.get<PhotoDto>(`${API_URL}/${id}`);
  }

  deletePhoto(id: number): Observable<void> {
    return this._http.delete<void>(`${API_URL}/${id}`);
  }

  postPhoto(photo: PhotoDto): Observable<PhotoDto> {
    return this._http.post<PhotoDto>(API_URL, photo);
  }

  putPhoto(photo: PhotoDto): Observable<PhotoDto> {
    return this._http.put<PhotoDto>(`${API_URL}/${photo.id}`, photo);
  }

  patchPhoto(photo: PhotoDto): Observable<PhotoDto> {
    return this._http.patch<PhotoDto>(`${API_URL}/${photo.id}`, photo);
  }
}