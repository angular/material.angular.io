import {
  Component,
  Input,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ApplicationRef,
  Injector
} from '@angular/core';
import {Http} from '@angular/http';
import {DomPortalHost, ComponentPortal} from '@angular/material';
import {ExampleViewer} from '../example-viewer/example-viewer';


@Component({
  selector: 'doc-viewer',
  template: 'Loading document...',
})
export class DocViewer {
  /** The URL of the document to display. */
  @Input()
  set documentUrl(url: string) {
    this._fetchDocument(url);
  }

  constructor(private _appRef: ApplicationRef,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _elementRef: ElementRef,
              private _http: Http,
              private _injector: Injector,
              private _viewContainerRef: ViewContainerRef) {}

  /** Fetch a document by URL. */
  private _fetchDocument(url: string) {
    this._http.get(url).subscribe(
        response => {
          // TODO(mmalerba): Trust HTML.
          if (response.ok) {
            let docHtml = response.text();
            this._elementRef.nativeElement.innerHTML = docHtml;
            this._loadLiveExamples();
          } else {
            this._elementRef.nativeElement.innerText =
              `Failed to load document: ${url}. Error: ${response.status}`;
          }
        },
        error => {
          this._elementRef.nativeElement.innerText =
              `Failed to load document: ${url}. Error: ${error}`;
        });
  }

  /** Instantiate a ExampleViewer for each example. */
  private _loadLiveExamples() {
    let exampleElements =
        this._elementRef.nativeElement.querySelectorAll('[material-docs-example]');
    Array.prototype.slice.call(exampleElements).forEach((element: Element) => {
      console.log('create portal');
      let example = element.getAttribute('material-docs-example');
      let portalHost =
          new DomPortalHost(element, this._componentFactoryResolver, this._appRef, this._injector);
      let examplePortal = new ComponentPortal(ExampleViewer, this._viewContainerRef);
      let exampleViewer = portalHost.attach(examplePortal);
      exampleViewer.instance.example = example;
    });
  }
}
