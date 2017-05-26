import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import {InlineSVGModule} from 'ng-inline-svg';
import {MaterialDocsApp} from './material-docs-app';
import {Homepage} from './pages/homepage/homepage';
import {routing} from './routes';
import {ComponentList} from './pages/component-list/component-list';
import {ComponentViewer} from './pages/component-viewer/component-viewer';
import {GuideList} from './pages/guide-list';
import {GuideViewer} from './pages/guide-viewer';
import {ExampleModule} from './examples/example-module';
import {SharedModule} from './shared/shared-module';
import {ComponentCategoryList} from './pages/component-category-list/component-category-list';
import {ComponentSidenav} from './pages/component-sidenav/component-sidenav';
import {Footer} from './shared/footer/footer';
import {ComponentPageTitle} from './pages/page-title/page-title';
import {ComponentPageHeader} from './pages/component-page-header/component-page-header';
import {StyleManager} from './shared/style-manager/style-manager';


@NgModule({
  declarations: [
    MaterialDocsApp,
    ComponentCategoryList,
    ComponentList,
    ComponentSidenav,
    ComponentViewer,
    ComponentPageHeader,
    GuideList,
    GuideViewer,
    Homepage,
    Footer,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    MaterialDocsApp,
    Homepage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ExampleModule,
    SharedModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    routing,
    InlineSVGModule,
  ],
  providers: [
    Location,
    ComponentPageTitle,
    StyleManager,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [MaterialDocsApp],
})
export class AppModule {}
