import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarModel } from '../models/carModel';
import { RentalModel } from '../models/rentalModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // car: CarModel = {
  //   carId: 1,
  //   carName: "",
  //   brandName: "",
  //   carImage: "",
  //   colorName: "",
  //   dailyPrice: 1
  // };

  // private carSource = new BehaviorSubject(this.car);
  // carData = this.carSource.asObservable();
  rental: RentalModel = {
    carId: 0,
    customerId: 0,
    rentalId: 0,
    rentDate: new Date(),
    returnDate: new Date(),
  };
  private rentalSource = new BehaviorSubject(this.rental);
  rentalData = this.rentalSource.asObservable();

  constructor() { }

  changeCar(car: CarModel) {
    // this.carSource.next(car);
  }

  rentCarData(rental: RentalModel) {
    this.rentalSource.next(rental);
  }
}
