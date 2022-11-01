import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalModel } from '../models/rentalModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient: HttpClient) { }

  rentCar(rental: RentalModel) {

  }
}
