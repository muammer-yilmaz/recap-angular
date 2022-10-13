import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrandModel } from '../models/brandModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  getBrands() {
    let url = environment.apiUrl + "brand/getall"
    return this.httpClient.get<ListResponseModel<BrandModel>>(url);
  }
}
