import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrandModel } from '../models/brandModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  getBrands() {
    let url = environment.apiUrl + "brands/getall"
    return this.httpClient.get<ListResponseModel<BrandModel>>(url);
  }

  addBrand(brandName: string) {
    let url = environment.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(url, brandName);
  }
}
