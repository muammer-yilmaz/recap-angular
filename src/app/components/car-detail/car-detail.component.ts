import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-config';
import { ToastrService } from 'ngx-toastr';
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
  startDate: string;
  endDate: string;
  rentPrice: number;
  constructor(private imageService: ImageService, private activatedRoute: ActivatedRoute,
    private carService: CarService, private toastrService: ToastrService,
    private router: Router, private dataService: DataService) { }

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

  goToPayment() {

    console.log('this.startDate :>> ', this.startDate);
    console.log('this.endDate', this.endDate)
    if (!this.startDate || !this.endDate) {
      this.toastrService.error("Tarihler boş olamaz")
      return;
    } else if (!this.isDateMinThenLater(new Date(this.startDate), new Date(this.endDate))) {
      this.toastrService.error("Bitiş zamanı başlangıçtan önce veya aynı olamaz");
      return;
    }
    else {
      let startDate = new Date(this.startDate);
      let endDate = new Date(this.endDate);
      this.dataService.rentCarData({
        customerId: 1,
        rentDate: startDate,
        returnDate: endDate,
        rentalId: 0,
        carId: this.carData.carId
      });
      this.router.navigate(['rent', this.carData.carId])
    }


  }

  getRentPrice() {
    let price = 0;
    if (this.startDate !== undefined && this.endDate !== undefined) {
      let startDate = new Date(this.startDate);
      let endDate = new Date(this.endDate);
      let days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      price = days * this.carData.dailyPrice;
    }
    this.rentPrice = price;
  }



  setStartDate(event: Event) {
    let val = this.validateStartDate("" + event);
    if (val) {
      this.startDate = "" + event;
      this.getRentPrice();
    } else {
      (document.getElementById("from-date") as HTMLInputElement).value = this.startDate;
      this.toastrService.error("Başlangıç zamanı bitişten sonra veya aynı olamaz");
    }
  }

  setEndDate(event: Event) {
    let val = this.validateEndDate("" + event);
    if (val) {
      this.endDate = "" + event;
      this.getRentPrice();
    } else {
      (document.getElementById("to-date") as HTMLInputElement).value = this.endDate;
      this.toastrService.error("Bitiş zamanı başlangıçtan önce veya aynı olamaz");
    }
  }

  validateStartDate(start: string): boolean {
    if (this.endDate === "" && this.endDate === null && this.endDate === undefined) {
      return true;
    }
    let startDate = new Date(start);
    let endDate = new Date(this.endDate);
    return this.isDateMinThenLater(startDate, endDate);
  }

  validateEndDate(end: string): boolean {
    if (this.startDate === "" && this.startDate === null && this.startDate === undefined) {
      return true;
    }
    let endDate = new Date(end);
    let startDate = new Date(this.startDate);
    return this.isDateMinThenLater(startDate, endDate);
  }

  isDateMinThenLater(start: Date, end: Date) {
    if (end.getTime() - start.getTime() <= 0) {
      return false;
    }
    return true
  }


}
