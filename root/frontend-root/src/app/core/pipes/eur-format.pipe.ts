import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eurFormat',
  standalone: true,
})
export class EurFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return 'EUR 0,00';
    }

    return 'EUR ' + value.toFixed(2).replace('.', ',');
  }
}
