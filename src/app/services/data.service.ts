import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarModel } from '../models/carModel';

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

  constructor() { }

  changeCar(car: CarModel) {
    // this.carSource.next(car);
  }
}
