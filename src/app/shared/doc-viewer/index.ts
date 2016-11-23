import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {DocViewer} from './doc-viewer';
import {ExampleViewer} from '../example-viewer/example-viewer';

export * from './doc-viewer';

@NgModule({
  imports: [
    HttpModule,
  ],
  declarations: [DocViewer],
  exports: [DocViewer],
  entryComponents: [
    ExampleViewer,
  ],
})
export class DocViewerModule {}
