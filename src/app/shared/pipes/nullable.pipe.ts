import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullable'
})
export class NullablePipe implements PipeTransform {

  transform(value): string {
    // Check if value is null or undefined
    return value == null ? '--' : value;
  }

}