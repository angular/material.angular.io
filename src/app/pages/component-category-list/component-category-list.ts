import {CommonModule} from '@angular/common';
import {Component, NgModule, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material';
import {ActivatedRoute, Params, RouterModule} from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import {Observable} from 'rxjs/Observable';
import {DocumentationItems} from '../../shared/documentation-items/documentation-items';
import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import {ComponentPageTitle} from '../page-title/page-title';


@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.html',
  styleUrls: ['./component-category-list.scss']
})
export class ComponentCategoryList implements OnInit {
  params: Observable<Params>;

  constructor(public docItems: DocumentationItems, private _route: ActivatedRoute) {}

  ngOnInit() {
    // Combine params from all of the path into a single object.
    this.params = Observable.combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign);
  }
}

@NgModule({
  imports: [SvgViewerModule, MatCardModule, CommonModule, RouterModule],
  exports: [ComponentCategoryList],
  declarations: [ComponentCategoryList],
  providers: [DocumentationItems, ComponentPageTitle],
})
export class ComponentCategoryListModule { }
