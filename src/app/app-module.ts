import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {MatNativeDateModule} from '@angular/material';
import {ExampleModule} from '@angular/material-examples';

import {MaterialDocsApp} from './material-docs-app';
import {HomepageModule} from './pages/homepage/homepage';
import {MATERIAL_DOCS_ROUTES} from './routes';
import {ComponentListModule} from './pages/component-list/component-list';
import {ComponentViewerModule} from './pages/component-viewer/component-viewer';
import {ComponentCategoryListModule} from './pages/component-category-list/component-category-list';
import {ComponentSidenavModule} from './pages/component-sidenav/component-sidenav';
import {FooterModule} from './shared/footer/footer';
import {ComponentPageTitle} from './pages/page-title/page-title';
import {ComponentHeaderModule} from './pages/component-page-header/component-page-header';
import {StyleManager} from './shared/style-manager/style-manager';
import {SvgViewerModule} from './shared/svg-viewer/svg-viewer';
import {ThemePickerModule} from './shared/theme-picker/theme-picker';
import {StackblitzButtonModule} from './shared/stackblitz/stackblitz-button';
import {NavBarModule} from './shared/navbar/navbar';
import {ThemeStorage} from './shared/theme-picker/theme-storage/theme-storage';
import {GuideItems} from './shared/guide-items/guide-items';
import {DocumentationItems} from './shared/documentation-items/documentation-items';
import {GuideListModule} from './pages/guide-list/guide-list';
import {GuideViewerModule} from './pages/guide-viewer/guide-viewer';
import {DocViewerModule} from './shared/doc-viewer/doc-viewer-module';
import {
  CanActivateComponentSidenav
} from './pages/component-sidenav/component-sidenav-can-load-guard';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {GaService} from './shared/ga/ga';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ExampleModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatNativeDateModule,
    RouterModule.forRoot(MATERIAL_DOCS_ROUTES),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ComponentCategoryListModule,
    ComponentHeaderModule,
    ComponentListModule,
    ComponentSidenavModule,
    ComponentViewerModule,
    DocViewerModule,
    FooterModule,
    GuideListModule,
    GuideViewerModule,
    HomepageModule,
    NavBarModule,
    StackblitzButtonModule,
    SvgViewerModule,
    ThemePickerModule,
  ],
  declarations: [MaterialDocsApp],
  providers: [
    ComponentPageTitle,
    DocumentationItems,
    GaService,
    GuideItems,
    StyleManager,
    ThemeStorage,
    CanActivateComponentSidenav,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [MaterialDocsApp],
})
export class AppModule {}
