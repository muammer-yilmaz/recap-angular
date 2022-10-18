import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarImageModel } from '../models/carImageModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  getCarImages(carId: number) {
    let url = environment.apiUrl + "carimages/getcarimages?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImageModel>>(url);
  }
}
