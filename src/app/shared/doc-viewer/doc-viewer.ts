import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  Output,
  SecurityContext,
  ViewContainerRef,
  Renderer2,
  AfterContentChecked
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ExampleViewer } from '../example-viewer/example-viewer';
import { HeaderLink } from './header-link';
import { CopierService } from '../copier/copier.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'doc-viewer',
  template: 'Loading document...',
})
export class DocViewer implements OnDestroy, AfterContentChecked {
  c = 1;
  private _portalHosts: DomPortalOutlet[] = [];
  private _documentFetchSubscription: Subscription;

  @Input() name: string;

  /** The URL of the document to display. */
  @Input()
  set documentUrl(url: string | undefined) {
    if (url !== undefined) {
      this._fetchDocument(url);
    }
  }

  @Output() contentRendered = new EventEmitter<HTMLElement>();

  /** The document text. It should not be HTML encoded. */
  textContent = '';

  constructor(private _appRef: ApplicationRef,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _elementRef: ElementRef,
              private _http: HttpClient,
              private _injector: Injector,
              private _viewContainerRef: ViewContainerRef,
              private _ngZone: NgZone,
              private _domSanitizer: DomSanitizer,
              private copier: CopierService,
              private snackbar: MatSnackBar,
              private render: Renderer2) {
  }

  /** Fetch a document by URL. */
  private _fetchDocument(url: string) {
    // Cancel previous pending request
    if (this._documentFetchSubscription) {
      this._documentFetchSubscription.unsubscribe();
    }

    this._documentFetchSubscription = this._http.get(url, { responseType: 'text' }).subscribe(
      document => this.updateDocument(document),
      error => this.showError(url, error)
    );
  }

  /**
   * Updates the displayed document.
   * @param rawDocument The raw document content to show.
   */
  private updateDocument(rawDocument: string) {
    // Replace all relative fragment URLs with absolute fragment URLs. e.g. "#my-section" becomes
    // "/components/button/api#my-section". This is necessary because otherwise these fragment
    // links would redirect to "/#my-section".
    rawDocument = rawDocument.replace(/href="#([^"]*)"/g, (_m: string, fragmentUrl: string) => {
      const absoluteUrl = `${location.pathname}#${fragmentUrl}`;
      return `href="${this._domSanitizer.sanitize(SecurityContext.URL, absoluteUrl)}"`;
    });

    this._elementRef.nativeElement.innerHTML = rawDocument;
    this.textContent = this._elementRef.nativeElement.textContent;

    this._loadComponents('material-docs-example', ExampleViewer);
    this._loadComponents('header-link', HeaderLink);

    // Resolving and creating components dynamically in Angular happens synchronously, but since
    // we want to emit the output if the components are actually rendered completely, we wait
    // until the Angular zone becomes stable.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.contentRendered.next(this._elementRef.nativeElement));
  }

  /** Show an error that occurred when fetching a document. */
  private showError(url: string, error: HttpErrorResponse) {
    console.log(error);
    this._elementRef.nativeElement.innerText =
      `Failed to load document: ${url}. Error: ${error.statusText}`;
  }

  /** Instantiate a ExampleViewer for each example. */
  private _loadComponents(componentName: string, componentClass: any) {
    const exampleElements =
      this._elementRef.nativeElement.querySelectorAll(`[${componentName}]`);

    Array.prototype.slice.call(exampleElements).forEach((element: Element) => {
      const example = element.getAttribute(componentName);
      const portalHost = new DomPortalOutlet(
        element, this._componentFactoryResolver, this._appRef, this._injector);
      const examplePortal = new ComponentPortal(componentClass, this._viewContainerRef);
      const exampleViewer = portalHost.attach(examplePortal);
      if (example !== null) {
        (exampleViewer.instance as ExampleViewer).example = example;
      }

      this._portalHosts.push(portalHost);
    });
  }

  private _clearLiveExamples() {
    this._portalHosts.forEach(h => h.dispose());
    this._portalHosts = [];
  }

  ngOnDestroy() {
    this._clearLiveExamples();

    if (this._documentFetchSubscription) {
      this._documentFetchSubscription.unsubscribe();
    }
  }
  /** function to call copy function from copierService. */
  copySource(text: string) {
    if (this.copier.copyText(text)) {
      this.snackbar.open('Code copied', '', { duration: 2500 });
    } else {
      this.snackbar.open('Copy failed. Please try again!', '', { duration: 2500 });
    }
  }

  // ngAfterContentChecked is used since ngOninit and ngContentinit does not get the
  // pre tags from html since not loaded
  // Since ngaftercontentchecked is called again and again when page scroll done
  // so var c is assigned to prevent function call to copycode()
  ngAfterContentChecked() {
    if (this.c === 1) {
      this.copycode();
    }
  }
  copycode() {
    const pre = this._elementRef.nativeElement.querySelectorAll('pre');
    if (pre.length > 0) {
      pre.forEach((e: any) => {
        const mat = this.render.createElement('mat-icon');
        this.render.appendChild(mat, this.render.createText('content_copy'));
        this.render.addClass(mat, 'mat-icon');
        this.render.addClass(mat, 'material-icons');
        this.render.setStyle(mat, 'font-size', '20px');
        const button = this.render.createElement('button');
        this.render.addClass(button, 'mat-icon-button');
        button.id = 'copy';
        button.title = 'Copy code';
        this.render.appendChild(button, mat);
        this.render.appendChild(e, button);
        this.render.listen(button, 'click', (event) => {
          this.copySource(e.textContent);
        });
      });
      this.c = 0;
    }
  }

}
