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
import {ComponentList} from './pages/component-list/component-list';
import {DocViewerModule} from './shared/doc-viewer/index';
import {ComponentViewer} from './pages/component-viewer/component-viewer';
import {DocumentationItems} from './shared/documentation-items/documentation-items';
import {ExampleViewer} from './shared/example-viewer/example-viewer';
import {ExampleModule, EXAMPLE_LIST} from './examples/example-module';


@NgModule({
  declarations: [
    ExampleViewer,
    MaterialDocsApp,
    ComponentList,
    ComponentViewer,
    Homepage,
    NavBar,
  ],
  imports: [
    BrowserModule,
    ExampleModule,
    DocViewerModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
  ],
  providers: [
    Location,
    DocumentationItems,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [MaterialDocsApp],
})
export class AppModule {}
