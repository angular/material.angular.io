import {
  Component,
  NgModule,
  ModuleWithProviders,
  Input,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import {Http} from '@angular/http';
import {DomPortalHost, ComponentPortal} from '@angular/material';
import {MaterialIoExampleViewer} from '../example-viewer/example-viewer';


@Component({
  selector: 'material-io-doc-viewer',
  template: 'Loading document...',
})
export class MaterialIoDocViewer {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _elementRef: ElementRef,
              private _http: Http,
              private _viewContainerRef: ViewContainerRef) {}

  /** The url of the document to display. */
  @Input('document-url')
  set documentUrl(url: string) {
    this._http.get(url).subscribe(
      (response) => {
        // TODO(mmalerba): Trust HTML.
        let docHtml = response.text();
        this._elementRef.nativeElement.innerHTML = docHtml;
        this._initExamples();
      },
      (error) => {
        console.log(error);
        this._elementRef.nativeElement.innerText =
            `Failed to load document: ${url}. Error: ${error}`;
      }
    );
  }

  /** Instantiate a MaterialIoExampleViewer for each example. */
  private _initExamples() {
    let exampleElements =
        this._elementRef.nativeElement.querySelectorAll('[material-docs-example]');
    exampleElements.forEach((element: Element) => {
      let example = element.getAttribute('material-docs-example');
      console.log(example);
      let portalHost = new DomPortalHost(element, this._componentFactoryResolver);
      let examplePortal = new ComponentPortal(MaterialIoExampleViewer, this._viewContainerRef);
      let exampleViewer = portalHost.attachComponentPortal(examplePortal);
      exampleViewer.instance.example = example;
    });
  }
}


@NgModule({
  exports: [MaterialIoDocViewer],
  declarations: [MaterialIoDocViewer],
  entryComponents: [MaterialIoExampleViewer],
})
export class MaterialIoDocViewerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialIoDocViewerModule,
      providers: []
    };
  }
}
