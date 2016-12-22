import {Injectable} from '@angular/core';

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable()
export class ComponentPageTitle {
  _title: string = '';

  get title(): string { return this._title; }
  set title(title: string) { this._title = title; }
}
