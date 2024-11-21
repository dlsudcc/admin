import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullable'
})
export class NullablePipe implements PipeTransform {

  transform(value): string {
    return value == null || !value || value == undefined ? '--' : value;
  }

}
