

import { Pipe } from '@angular/core';

@Pipe({ name: 'keyValue' })
export class KeyValuePipe {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof CityPipe
   */
  transform(value: any): {key: string, value: any}[] {
    if(value) {
      const keyValues = [];
      for (let key in value) {
        keyValues.push({key: key, value: value[key]});
      }
      return keyValues;
  }
  }
};
