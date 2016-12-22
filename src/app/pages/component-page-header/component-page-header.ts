import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Http} from '@angular/http';
import {ComponentPortal} from '@angular/material';
import 'rxjs/add/operator/first';

import {EXAMPLE_COMPONENTS, LiveExample} from '../../examples/example-module';
import {ComponentPageTitle} from '../page-title/page-title';

@Component({
  selector: 'component-page-header',
  templateUrl: './component-page-header.html',
  styleUrls: ['./component-page-header.scss']
})
export class ComponentPageHeader {
  constructor(private _componentPageTitle: ComponentPageTitle) { }

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}
