import { Component, OnInit } from '@angular/core';
import { RentalModel } from 'src/app/models/rentalModel';
import { CreditCardModel } from 'src/app/models/creditCardModel';
import { DataService } from 'src/app/services/data.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentModel } from 'src/app/models/paymentModel';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  creditCard: CreditCardModel = {
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: ""
  };

  rental: RentalModel;

  constructor(private rentalService: RentalService, private dataService: DataService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.dataService.rentalData.subscribe({
      next: (val) => {
        this.rental = val;
      },
      error: error => {
        console.log('error :>> ', error);
      }
    })
  }

  rentCar(rental: RentalModel) {

  }

  fillArray(start: number, end: number): Array<number> {
    const arr: Array<number> = [];
    if (start === 0) {
      let date = new Date();
      start = date.getFullYear() % 100;
      end = start + end;
    }
    for (let i = start; i < end; i++) {
      arr.push(i);
    }
    return arr;
  }

  setMonth(event: Event) {
    this.creditCard.expirationMonth = (event.target as HTMLInputElement).value;
  }

  setYear(event: Event) {
    this.creditCard.expirationYear = (event.target as HTMLInputElement).value;
  }

  pay() {
    if (this.validateInputs()) {
      this.toastrService.error("Lütfen tüm alanları doldurun");
      return;
    }
    let payment: PaymentModel = {
      ...this.creditCard,
      ...this.rental
    }
    console.log('payment', payment)
    this.rentalService.rentCar(payment).subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        this.toastrService.success(response.message)
      },
      error: errorResponse => {
        console.log('errorResponse', errorResponse)
        this.toastrService.error(errorResponse.error.message)
      }
    })
  }

  validateInputs(): boolean {
    return Object.values(this.creditCard).every(value => {
      if (value === null || value === undefined || value === "") {
        return true;
      }
      return false;
    })
  }

}
