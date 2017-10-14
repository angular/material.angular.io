import {Component, NgModule, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {
  DocumentationItems,
  SECTIONS,
  DocCategory
} from '../../shared/documentation-items/documentation-items';
import {ComponentPageTitle} from '../page-title/page-title';
import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/combineLatest';


@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.html',
  styleUrls: ['./component-category-list.scss']
})
export class ComponentCategoryList implements OnInit {
  section: string;
  categories: DocCategory[];
  _titleUpdateSubscription: Subscription;

  constructor(public docItems: DocumentationItems,
              public _componentPageTitle: ComponentPageTitle,
              private _route: ActivatedRoute) {}

  ngOnInit() {
    // Combine params from all of the path into a single object.
    Observable
      .combineLatest(this._route.pathFromRoot.map(route => route.params), Object.assign)
      .subscribe(params => {
        this.section = params['section'];
        this.categories = this.docItems.getCategories(this.section);
        this._componentPageTitle.title = SECTIONS[this.section];
      });
  }
}

@NgModule({
  imports: [SvgViewerModule, MatCardModule, CommonModule, RouterModule],
  exports: [ComponentCategoryList],
  declarations: [ComponentCategoryList],
  providers: [DocumentationItems, ComponentPageTitle],
})
export class ComponentCategoryListModule { }
