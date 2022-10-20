import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarModel } from 'src/app/models/carModel';
import { CarService } from 'src/app/services/car.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  carList: CarModel[];

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrandId(params["brandId"])
      }
      else if (params["colorId"]) {
        this.getCarsByColorId(params["colorId"])
      } else {
        this.getCars();
      }
    })
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        this.carList = response.data;
      },
      error: (responseError) => {
        console.log('responseError', responseError)
      }
    })
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        this.carList = response.data;
      }
    })
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe({
      next: (response) => {
        console.log('response', response)
        this.carList = response.data;
      }
    })
  }

  onCarClick(car: CarModel) {
    this.data.changeCar(car);
  }

}

