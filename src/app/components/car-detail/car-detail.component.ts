import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CarImageModel } from 'src/app/models/carImageModel';
import { CarModel } from 'src/app/models/carModel';
import { CarService } from 'src/app/services/car.service';
import { DataService } from 'src/app/services/data.service';
import { ImageService } from 'src/app/services/image.service';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  imageList: CarImageModel[];
  carData: CarModel;
  subscription: Subscription;
  constructor(private imageService: ImageService, private activatedRoute: ActivatedRoute,
    private carService: CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarImages(params["carId"]);
        this.getCarDetails(params["carId"]);
      }
    })
  }

  getCarImages(carId: number) {
    this.imageService.getCarImages(carId).subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        if (response.data.length === 0) {
          let date = new Date();
          this.imageList = [{ carId: 0, date: date, imageId: 0, imagePath: "no-image.png" }]
        } else {
          this.imageList = response.data;
        }
      },
      error: (error) => {
        console.log('error', error)
      }
    })
  }
  getCarDetails(carId: number) {
    this.carService.getCarById(carId).subscribe({
      next: (response) => {
        this.carData = response.data;
        console.log('response', response)
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      }
    })
  }


}
