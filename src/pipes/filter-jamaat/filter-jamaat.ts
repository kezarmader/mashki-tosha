import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterJamaatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterJamaat',
})
export class FilterJamaatPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any[], filterArgs) {

    if (!filterArgs || filterArgs.trim() == '') {
      return value;
    }

    return value.filter(e => e.name.toLowerCase().indexOf(filterArgs.trim().toLowerCase()) != -1);
  }
}
