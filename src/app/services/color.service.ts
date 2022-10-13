import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ColorModel } from '../models/colorModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }

  getColors() {
    let url = environment.apiUrl + "color/getall";
    return this.httpClient.get<ListResponseModel<ColorModel>>(url);
  }
}
