import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ColorModel } from '../models/colorModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }

  getColors() {
    let url = environment.apiUrl + "colors/getall";
    return this.httpClient.get<ListResponseModel<ColorModel>>(url);
  }

  addColor(colorName: string) {
    let url = environment.apiUrl + "colors/add";
    return this.httpClient.post<ResponseModel>(url, colorName);
  }
}
