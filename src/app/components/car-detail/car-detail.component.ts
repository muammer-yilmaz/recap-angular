import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CarImageModel } from 'src/app/models/carImageModel';
import { CarModel } from 'src/app/models/carModel';
import { DataService } from 'src/app/services/data.service';
import { ImageService } from 'src/app/services/image.service';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit, OnDestroy {

  imageList: CarImageModel[];
  carData: CarModel;
  subscription: Subscription;
  constructor(private imageService: ImageService, private activatedRoute: ActivatedRoute,
    private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.carData.subscribe(car => this.carData = car)
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarImages(params["carId"])
      }
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCarImages(carId: number) {
    this.imageService.getCarImages(carId).subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        this.imageList = response.data;
      },
      error: (error) => {
        console.log('error', error)
      }
    })
  }


}
