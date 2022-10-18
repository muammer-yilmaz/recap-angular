import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImageModel } from 'src/app/models/carImageModel';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  imageList: CarImageModel[];
  index: number = 0;

  constructor(private imageService: ImageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarImages(params["carId"])
      }
    })
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
