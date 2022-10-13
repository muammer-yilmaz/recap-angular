import { Component, OnInit } from '@angular/core';
import { ColorModel } from 'src/app/models/colorModel';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colorList: ColorModel[];
  currentColor: ColorModel;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe({
      next: (response) => {
        this.colorList = response.data;
      },
      error: (responseError) => {
        console.log('responseError', responseError)
      }
    })
  }

  setCurrentColor(color: ColorModel) {
    this.currentColor = color
  }

  getCurrentColor(color: ColorModel) {
    if (color == this.currentColor) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

}
