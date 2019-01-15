import { Pipe } from '@angular/core';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'parseskill' })
export class ParseSkill {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof ParseSkill
   */
  transform(value: Array<any>) {
    if (!value) {
      return '';
    }

    let skills = '';
    from(value)
      .pipe(
        map(val => val.name),
        reduce((acc, value) => acc + ", " + value)
      ).subscribe(val => {
        skills =  val
      })
    return skills;
  }
};
