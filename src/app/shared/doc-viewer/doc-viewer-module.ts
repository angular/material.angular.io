import {DocViewer} from './doc-viewer';
import {ExampleViewer} from '../example-viewer/example-viewer';
import {StackBlitzButtonModule} from '../stack-blitz';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HeaderLink} from './header-link';
import {CodeSnippet} from '../example-viewer/code-snippet';
import { DocsApiModuleImport } from './docs-api-module-import/docs-api-module-import';


// ExampleViewer is included in the DocViewerModule because they have a circular dependency.
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    PortalModule,
    StackBlitzButtonModule
  ],
  providers: [CopierService],
  declarations: [DocViewer, ExampleViewer, HeaderLink, CodeSnippet, DocsApiModuleImport],
  entryComponents: [ExampleViewer, HeaderLink, DocsApiModuleImport],
  exports: [DocViewer, ExampleViewer, HeaderLink, DocsApiModuleImport],
})
export class DocViewerModule { }
