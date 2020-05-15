import {
  Component,
  Input,
  NgModule,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DocumentationItems} from '../../shared/documentation-items/documentation-items';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {ActivatedRoute, Params, RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ComponentHeaderModule} from '../component-page-header/component-page-header';
import {FooterModule} from '../../shared/footer/footer';
import {combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {BreakpointObserver} from '@angular/cdk/layout';
import {
  ComponentCategoryList,
  ComponentCategoryListModule
} from '../component-category-list/component-category-list';
import {
  ComponentApi,
  ComponentExamples,
  ComponentOverview,
  ComponentViewer,
  ComponentViewerModule
} from '../component-viewer/component-viewer';
import {DocViewerModule} from '../../shared/doc-viewer/doc-viewer-module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StackBlitzButtonModule} from '../../shared/stack-blitz';
import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import {MatDrawerToggleResult} from '@angular/material/sidenav/drawer';
import {MatListModule} from '@angular/material/list';
import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';
import {NavigationFocusService} from '../../shared/navigation-focus/navigation-focus.service';

// These constants are used by the ComponentSidenav for orchestrating the MatSidenav in a responsive
// way. This includes hiding the sidenav, defaulting it to open, changing the mode from over to
// side, determining the size of the top gap, and whether the sidenav is fixed in the viewport.
// The values were determined through the combination of Material Design breakpoints and careful
// testing of the application across a range of common device widths (360px+).
// These breakpoint values need to stay in sync with the related Sass variables in
// src/styles/_constants.scss.
const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.html',
  styleUrls: ['./component-sidenav.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentSidenav implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  params: Observable<Params>;
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;
  private subscriptions = new Subscription();

  constructor(public docItems: DocumentationItems,
              private _route: ActivatedRoute,
              private _navigationFocusService: NavigationFocusService,
              zone: NgZone,
              breakpoints: BreakpointObserver) {
    this.isExtraScreenSmall =
        breakpoints.observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
            .pipe(map(breakpoint => breakpoint.matches));
    this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
    .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit() {
    // Combine params from all of the path into a single object.
    this.params = combineLatest(
        this._route.pathFromRoot.map(route => route.params), Object.assign);

    this.subscriptions.add(
      this._navigationFocusService.navigationEndEvents.pipe(map(() => this.isScreenSmall))
      .subscribe((shouldCloseSideNav) => {
          if (shouldCloseSideNav && this.sidenav) {
            this.sidenav.close();
          }
        }
      ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
    return sidenav.toggle();
  }
}

@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.html',
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', display: 'none'})),
      state('expanded', style({height: '*', display: 'block'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class ComponentNav implements OnInit, OnDestroy {
  @Input() params: Observable<Params>;
  currentItemId: string;
  private _onDestroy = new Subject<void>();

  constructor(public docItems: DocumentationItems) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}

const routes: Routes = [ {
  path : '',
  component : ComponentSidenav,
  children : [
    {path : '', redirectTo : 'categories', pathMatch : 'full'},
    {path : 'component/:id', redirectTo : ':id', pathMatch : 'full'},
    {path : 'category/:id', redirectTo : '/categories/:id', pathMatch : 'full'},
    {
      path : 'categories',
      children : [
        {path : '', component : ComponentCategoryList},
      ],
    },
    {
      path : ':id',
      component : ComponentViewer,
      children : [
        {path : '', redirectTo : 'overview', pathMatch : 'full'},
        {path : 'overview', component : ComponentOverview, pathMatch : 'full'},
        {path : 'api', component : ComponentApi, pathMatch : 'full'},
        {path : 'examples', component : ComponentExamples, pathMatch : 'full'},
        {path : '**', redirectTo : 'overview'},
      ],
    },
  ]
} ];

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    CommonModule,
    ComponentCategoryListModule,
    ComponentHeaderModule,
    ComponentViewerModule,
    DocViewerModule,
    FooterModule,
    FormsModule,
    HttpClientModule,
    CdkAccordionModule,
    MatIconModule,
    MatSidenavModule,
    StackBlitzButtonModule,
    SvgViewerModule,
    RouterModule.forChild(routes),
    NavigationFocusModule
  ],
  exports: [ComponentSidenav],
  declarations: [ComponentSidenav, ComponentNav],
  providers: [DocumentationItems],
})
export class ComponentSidenavModule {}
