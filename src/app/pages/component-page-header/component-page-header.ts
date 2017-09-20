import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import 'rxjs/add/operator/first';
import {ComponentPageTitle} from '../page-title/page-title';
import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';
import {MdButtonModule, MdIconModule} from '@angular/material';

@Component({
  selector: 'component-page-header',
  templateUrl: './component-page-header.html',
  styleUrls: ['./component-page-header.scss']
})
export class ComponentPageHeader {
  constructor(public _componentPageTitle: ComponentPageTitle) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [MdButtonModule, MdIconModule, NavigationFocusModule],
  exports: [ComponentPageHeader],
  declarations: [ComponentPageHeader],
  providers: [ComponentPageTitle],
})
export class ComponentHeaderModule { }
