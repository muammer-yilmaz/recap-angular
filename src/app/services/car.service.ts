import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarModel } from '../models/carModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  getCars() {
    let url = environment.apiUrl + "car/getall";
    return this.httpClient.get<ListResponseModel<CarModel>>(url);
  }

  getCarsByBrandId(brandId: number) {
    let url = environment.apiUrl + "car/getallbybrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarModel>>(url);
  }

  getCarsByColorId(colorId: number) {
    let url = environment.apiUrl + "car/getallbybrand?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarModel>>(url);
  }
}
