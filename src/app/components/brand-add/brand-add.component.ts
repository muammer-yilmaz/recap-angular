import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;

  constructor(private brandService: BrandService, private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    }
    )
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe({
        next: response => {
          console.log('response', response)
          this.toastrService.success(response.message);
        },
        error: errorResponse => {
          console.log('errorResponse :>> ', errorResponse);
          this.toastrService.error(errorResponse.error.message);
        }
      });
    } else {
      this.toastrService.error("Formunuz geçersiz", "Dikkat")
    }
  }

}
