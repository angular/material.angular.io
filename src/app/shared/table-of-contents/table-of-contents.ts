import {
  Component, Input, AfterViewInit, Inject, ElementRef, OnInit
} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Router, ActivatedRoute, Event, NavigationEnd} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

interface Link {
  /* id of the section*/
  id: string;

  /* header type h3/h4 */
  type: string;

  /* If the anchor is in view of the page */
  active: boolean;

  /* name of the anchor */
  name: string;

  /* top offset px of the anchor */
  top: number;
}

@Component({
  selector: 'table-of-contents',
  styleUrls: ['./table-of-contents.scss'],
  template: `
    <div *ngIf="links?.length" class="docs-toc-container">
      <div class="docs-toc-heading">Contents</div>
      <nav>
        <a [href]="_rootUrl + '#' + link.id"
          *ngFor="let link of links; let i = index"
          class="docs-level-{{link.type}}"
          [class.active]="link.active">
          {{link.name}}
        </a>
      </nav>
    </div>
  `
})
export class TableOfContents implements OnInit, AfterViewInit {

  @Input() links: Link[] = [];
  @Input() container: string;
  @Input() headerSelectors = '.docs-markdown-h3,.docs-markdown-h4';

  _rootUrl: string;
  private _scrollContainer: any;
  private _scrollSubscription: Subscription;
  private _routeSubscription: Subscription;
  private _fragmentObserver: MutationObserver;
  private _headerObserver: MutationObserver;

  private get scrollOffset(): number {
    const {top} = this._element.nativeElement.getBoundingClientRect();
    if (typeof this._scrollContainer.scrollTop !== 'undefined') {
      return this._scrollContainer.scrollTop + top;
    } else if (typeof this._scrollContainer.pageYOffset !== 'undefined') {
      return this._scrollContainer.pageYOffset + top;
    }
  }

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _element: ElementRef,
              @Inject(DOCUMENT) private _document: any) {

    this._routeSubscription = this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const rootUrl = _router.url.split('#')[0];
        if (rootUrl !== this._rootUrl) {
          this.links.splice(0, this.links.length);
          this.createLinks();
          this._rootUrl = rootUrl;
        }
      }
    });
  }

  ngOnInit(): void {
    this._scrollContainer = this.container ?
      this._document.querySelectorAll(this.container)[0] : window;

    this._scrollSubscription = Observable
      .fromEvent(this._scrollContainer, 'scroll')
      .debounceTime(10)
      .subscribe(this.onScroll.bind(this));
  }

  ngAfterViewInit(): void {
    this._route.fragment.subscribe(fragment => {
      // ensure we don't create memory leaks
      if (this._fragmentObserver) {
        this._fragmentObserver.disconnect();
      }

      // create a observer to ensure the element is loaded
      // into view before trying to query and scroll to it
      this._fragmentObserver = new MutationObserver(() => {
        const target = document.getElementById(fragment);
        if (target) {
          target.scrollIntoView();
          this._fragmentObserver.disconnect();
          this._fragmentObserver = null;
        }
      });

      this._fragmentObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  ngOnDestroy(): void {
    this._routeSubscription.unsubscribe();
    this._scrollSubscription.unsubscribe();

    if (this._fragmentObserver) {
      this._fragmentObserver.disconnect();
    }

    if (this._headerObserver) {
      this._headerObserver.disconnect();
    }
  }

  createLinks(): void {
    // ensure we don't create memory links
    if (this._headerObserver) {
      this._headerObserver.disconnect();
    }

    // observe body content changes until the headers
    // are painted. this is required because the page can load async
    this._headerObserver = new MutationObserver(() => {
      const headers = this._document.querySelectorAll(this.headerSelectors);
      if (headers.length) {
        for (const header of headers) {
          const {top} = header.getBoundingClientRect();
          this.links.push({
            name: header.innerText,
            type: header.tagName.toLowerCase(),
            top: top,
            id: header.id,
            active: false
          });
        }

        this._headerObserver.disconnect();
        this._headerObserver = null;
      }
    });

    this._headerObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  onScroll(): void {
    for (let i = 0; i < this.links.length; i++) {
      this.links[i].active = this.isLinkActive(this.links[i], this.links[i + 1]);
    }
  }

  isLinkActive(currentLink: any, nextLink: any): boolean {
    // A link is considered active if the page is scrolled passed the anchor without also
    // being scrolled passed the next link
    return this.scrollOffset >= currentLink.top && !(nextLink && nextLink.top < this.scrollOffset);
  }

}
