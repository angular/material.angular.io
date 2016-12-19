import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {DocViewer} from './doc-viewer/doc-viewer';
import {ExampleViewer} from './example-viewer/example-viewer';
import {DocumentationItems} from './documentation-items/documentation-items';
import {NavBar} from './navbar/navbar';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    MaterialModule,
  ],
  declarations: [DocViewer, ExampleViewer, NavBar],
  exports: [DocViewer],
  providers: [DocumentationItems],
  entryComponents: [
    ExampleViewer,
  ],
})
export class SharedModule {}
