import {
  Component, Input, AfterViewInit, Inject, ElementRef, OnInit
} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Router, ActivatedRoute, Event, NavigationEnd} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'table-of-contents',
  styleUrls: ['./table-of-contents.scss'],
  template: `
    <div *ngIf="links?.length" class="toc-container">
      <h2>Contents</h2>
      <ul>
        <li *ngFor="let link of links; let i = index" class="li-{{link.type}}">
          <a [href]="_rootUrl + '#' + link.id"
            [class.active]="link.active">
            {{link.name}}
          </a>
        </li>
      </ul>
    </div>
  `
})
export class TableOfContents implements OnInit, AfterViewInit {

  @Input() links: any[] = [];
  @Input() container: string;

  _rootUrl: string;
  private _scrollContainer: any;
  private _scrollSubscription: Subscription;
  private _routeSubscription: Subscription;

  private get scrollOffset(): number {
    const { top } = this._element.nativeElement.getBoundingClientRect();
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
      setTimeout(() => {
        const element: any = this._document.querySelector(`#${fragment}`);
        if (element) {
          element.scrollIntoView(element);
        }
      }, 500);
    });
  }

  ngOnDestroy(): void {
    this._routeSubscription.unsubscribe();
  }

  createLinks(): void {
    // content is loading async, the timeout helps delay the query selector being empty
    setTimeout(() => {
      const headers = this._document.querySelectorAll('.docs-markdown-h3,.docs-markdown-h4');
      for (const header of headers) {
        const { top } = header.getBoundingClientRect();
        this.links.push({
          name: header.innerText,
          type: header.tagName.toLowerCase(),
          top: top,
          id: header.id
        });
      }
    }, 500);
  }

  onScroll(): void {
    for (let i = 0; i < this.links.length; i++) {
      this.links[i].active = this.getLinkActive(this.links[i], this.links[i + 1]);
    }
  }

  getLinkActive(currentLink: any, nextLink: any): boolean {
    if (this.scrollOffset >= currentLink.top) {
      if (nextLink && nextLink.top < this.scrollOffset) {
        return false;
      }
      return true;
    }
    return false;
  }

}
