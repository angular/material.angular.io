import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MaterialDocsApp} from './material-docs-app';
import {MATERIAL_DOCS_ROUTES} from './routes';
import {NavBarModule} from './shared/navbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(MATERIAL_DOCS_ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected'
    }),
    NavBarModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [MaterialDocsApp],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [MaterialDocsApp],
})
export class AppModule {}
