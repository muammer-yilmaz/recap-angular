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
    let url = environment.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarModel>>(url);
  }

  getCarsByBrandId(brandId: number) {
    let url = environment.apiUrl + "cars/getallbybrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarModel>>(url);
  }

  getCarsByColorId(colorId: number) {
    let url = environment.apiUrl + "cars/getallbybrand?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarModel>>(url);
  }
}
