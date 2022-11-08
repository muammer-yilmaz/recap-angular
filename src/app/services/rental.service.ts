import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalModel } from '../models/rentalModel';
import { PaymentModel } from '../models/paymentModel';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient: HttpClient) { }

  rentCar(payment: PaymentModel) {
    let url = environment.apiUrl + "rentals/add";
    return this.httpClient.post<ResponseModel>(url, payment);
  }
}
