import {Component, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import {MatButtonModule} from '@angular/material/button';
import {FooterModule} from '../../shared/footer/footer';
import {RouterModule, Routes} from '@angular/router';
import {ComponentPageTitle} from '../page-title/page-title';
import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';
import {CarouselModule} from '../../shared/carousel/carousel-module';
import {GuideItems} from '../../shared/guide-items/guide-items';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Homepage implements OnInit {
  isNextVersion = location.hostname.startsWith('next.material.angular.io');

  constructor(readonly _componentPageTitle: ComponentPageTitle, readonly guideItems: GuideItems) {}

  ngOnInit(): void {
    this._componentPageTitle.title = '';
  }
}

const routes: Routes = [ {path: '', component: Homepage}];

@NgModule({
  imports: [SvgViewerModule,
            MatButtonModule,
            FooterModule,
            RouterModule.forChild(routes),
            NavigationFocusModule,
            CarouselModule, CommonModule, MatCardModule],
  exports: [Homepage],
  declarations: [Homepage],
  providers: [GuideItems]
})
export class HomepageModule {
}
