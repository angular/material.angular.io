import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {MaterialDocsApp} from './material-docs-app';
import {Homepage} from './pages/homepage/homepage';
import {NavBar} from './shared/navbar/navbar';
import {routing} from './routes';
import {ComponentsList} from './pages/components/components';
import {ThemeChooser} from './shared/theme-chooser/theme-chooser';
import {StyleManager} from './shared/style-manager/style-manager';


@NgModule({
  declarations: [
    MaterialDocsApp,
    ComponentsList,
    Homepage,
    NavBar,
    ThemeChooser,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
  ],
  providers: [
    Location,
    StyleManager,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [MaterialDocsApp],
})
export class AppModule {}
