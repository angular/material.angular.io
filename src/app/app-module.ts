import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {MaterialDocsApp} from './material-docs-app';
import {ExampleViewer} from './shared/example-viewer/example-viewer';
import {DocViewer} from './shared/doc-viewer/doc-viewer';
import {Homepage} from './pages/homepage/homepage';
import {NavBar} from './shared/navbar/navbar';
import {routing} from './routes';
import {ComponentsList} from './pages/components/components';


@NgModule({
  declarations: [
    DocViewer,
    ExampleViewer,
    MaterialDocsApp,
    ComponentsList,
    Homepage,
    NavBar,
  ],
  entryComponents: [
    ExampleViewer,
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
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [MaterialDocsApp],
})
export class AppModule {}
