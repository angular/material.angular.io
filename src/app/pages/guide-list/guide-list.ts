import {Component, HostBinding, NgModule, OnInit} from '@angular/core';
import {GuideItems} from '../../shared/guide-items/guide-items';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {FooterModule} from '../../shared/footer/footer';
import {CommonModule} from '@angular/common';
import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';
import {ComponentPageTitle} from '../page-title/page-title';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-guides',
  templateUrl: './guide-list.html',
  styleUrls: ['./guide-list.scss']
})
export class GuideList implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor(public guideItems: GuideItems, public _componentPageTitle: ComponentPageTitle) {}

  ngOnInit(): void {
    this._componentPageTitle.title = 'Guides';
  }
}

const routes: Routes = [{path: '', component: GuideList}];

@NgModule({
  imports: [CommonModule,
            MatListModule,
            FooterModule,
            RouterModule.forChild(routes),
            NavigationFocusModule, MatCardModule],
  exports: [GuideList],
  declarations: [GuideList],
  providers: [GuideItems],
})
export class GuideListModule { }
