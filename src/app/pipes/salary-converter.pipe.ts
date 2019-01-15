import { Pipe } from '@angular/core';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'salaryConverter' })
export class SalaryConverterPipe {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof SalaryConverterPipe
   */
  transform(minSalary: any, maxSalary:any, currency = 'USD'): string {
    if (!minSalary && !maxSalary) {
      return '';
    }
    if( minSalary == maxSalary) {
      return this.appendCurrency(currency, minSalary);
    } else {
      return this.appendCurrency(currency, minSalary) + ' - ' + this.appendCurrency(currency, maxSalary);
    }
  }

  private appendCurrency(currency: string, amount: any) {
    return currency + amount;
  }
};
