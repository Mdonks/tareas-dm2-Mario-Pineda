import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CloudinaryDtos } from '../dtos/cloudinary_model';
import { Observable } from 'rxjs';
import { CloudinaryResponseDto } from '../dtos/cloudinary_response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private _http: HttpClient = inject(HttpClient);

  uploadImage(model: CloudinaryDtos): Observable<CloudinaryResponseDto>{
    let formData = new FormData();
    formData.append('file',model.file);
    formData.append('folder', model.folder);
    formData.append('public_id', model.fileName);
    formData.append('upload_preset', environment.CLOUDINARY_UPDLOAD_PRESET);

    return this._http.post<CloudinaryResponseDto>(
      `${environment.CLOUDINARY_API}image/upload`, formData
    )
  }

}