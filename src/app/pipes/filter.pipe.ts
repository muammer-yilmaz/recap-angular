import { Pipe, PipeTransform } from '@angular/core';
import { CarModel } from '../models/carModel';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: CarModel[], filterText: string): CarModel[] {

    filterText = filterText ? filterText.trim().toLocaleLowerCase() : ""

    return filterText ? value.filter(
      (c: CarModel) => c.carName.toLocaleLowerCase().indexOf(filterText) !== -1)
      : value
  }

}
