import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {MaterialDocsApp} from './material-docs-app';
import {MaterialIoDocViewerModule} from '../components/doc-viewer/doc-viewer';


@NgModule({
  declarations: [
    MaterialDocsApp,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    MaterialIoDocViewerModule.forRoot(),
  ],
  providers: [
    Location,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [MaterialDocsApp],
})
export class AppModule {}
