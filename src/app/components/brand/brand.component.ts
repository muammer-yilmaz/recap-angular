import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/models/brandModel';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brandList: BrandModel[];
  currentBrand: BrandModel;

  constructor(private brandService: BrandService, private router: Router) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe({
      next: (response) => {
        console.log('response', response);
        this.brandList = response.data
      },
      error: (errorResponse) => {
        console.log('errorResponse :>> ', errorResponse);
      }
    })
  }

  setCurrentBrand(brand: BrandModel) {
    this.currentBrand = brand
  }

  getCurrentBrand(brand: BrandModel) {
    if (brand == this.currentBrand) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  navigateTo(event: Event) {
    const val = (event.target as HTMLSelectElement).value
    if (val) {
      val !== "0"
        ? this.router.navigate(["/cars/brand/" + val])
        : this.router.navigate(["/cars"])
    }
    return false;
  }

}
