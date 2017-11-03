import {Component, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ScrollDispatcher, CdkScrollable} from '@angular/cdk/scrolling';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';

interface Link {
  /* id of the section*/
  id: string;

  /* header type h3/h4 */
  type: string;

  /* name of the anchor */
  name: string;

  /* top offset px of the anchor */
  top: number;
}

@Component({
  selector: 'table-of-contents',
  styleUrls: ['./table-of-contents.scss'],
  templateUrl: './table-of-contents.html',
})
export class TableOfContents implements OnDestroy, OnInit {

  @Input() headerSelectors = '.docs-markdown-h3,.docs-markdown-h4';

  _links: Link[] = [];
  _activeLinkIndex: number;
  _rootUrl: string;
  private _scrollContainer: any;
  private _destroyed = new Subject();
  private _urlFragment = '';

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _element: ElementRef,
              private _scrollDispatcher: ScrollDispatcher,
              private _ngZone: NgZone,
              @Inject(DOCUMENT) private _document: Document) {

    // Create new links and save root url at the end of navigation
    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .takeUntil(this._destroyed)
      .subscribe(event => {
        const rootUrl = _router.url.split('#')[0];
        if (rootUrl !== this._rootUrl) {
          this._links = this.createLinks();
          this._rootUrl = rootUrl;
        }
      });

    // Scroll to section when the fragment changes
    this._route.fragment
      .takeUntil(this._destroyed)
      .subscribe(fragment => {
        this._urlFragment = fragment;
        this.scrollFragmentIntoView();
      });
  }

  ngOnInit() {
    // Update active link after scroll events
    this._scrollDispatcher.scrolled()
      .takeUntil(this._destroyed)
      .subscribe(scrollable =>
        this._ngZone.run(() => {
          this.updateScrollContainer(scrollable);
          this.setActiveLink();
        }));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  updateScrollPosition(): void {
    this._links = this.createLinks();
    this.scrollFragmentIntoView();
  }

  /** Find the target from the url fragment and scroll it into view. */
  private scrollFragmentIntoView(): void {
    const target = document.getElementById(this._urlFragment);
    if (target) {
      target.scrollIntoView();
    }
  }

  /** Gets links generated from header selectors. */
  private createLinks(): Link[] {
    const headers =
        Array.from(this._document.querySelectorAll(this.headerSelectors)) as HTMLElement[];

    return headers.map(header => {
      // remove the 'link' icon name from the inner text
      const name = header.innerText.trim().replace(/^link/, '');
      const {top} = header.getBoundingClientRect();
      return {
        name,
        top,
        type: header.tagName.toLowerCase(),
        id: header.id
      };
    });
  }

  private setActiveLink(): void {
    this._activeLinkIndex = this._links
        .findIndex((link, i) => this.isLinkActive(link, this._links[i + 1]));
  }

  private isLinkActive(currentLink: any, nextLink: any): boolean {
    // A link is considered active if the page is scrolled passed the anchor without also
    // being scrolled passed the next link
    const scrollOffset = this.getScrollOffset();
    return scrollOffset >= currentLink.top && !(nextLink && nextLink.top < scrollOffset);
  }

  /** Gets the scroll offset of the scroll container */
  private getScrollOffset(): number {
    const {top} = this._element.nativeElement.getBoundingClientRect();
    if (this._scrollContainer.scrollTop != null) {
      return this._scrollContainer.scrollTop + top;
    }

    if (this._scrollContainer.pageYOffset != null) {
      return this._scrollContainer.pageYOffset + top;
    }

    return 0;
  }

  private updateScrollContainer(scrollable: CdkScrollable | void): void {
    this._scrollContainer = scrollable ?
      scrollable.getElementRef().nativeElement :
      window;
  }

}
