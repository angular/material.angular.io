import {ElementRef, Injectable, OnDestroy} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {filter, skip} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationFocusService implements OnDestroy {
  private subscriptions = new Subscription();
  private navigationFocusRequests: ElementRef[] = [];
  private skipLinkFocusRequests: ElementRef[] = [];
  private skipLinkHref = '';

  readonly navigationEndEvents = this.router.events
    .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd));
  readonly softNavigations = this.navigationEndEvents.pipe(skip(1));

  constructor(private router: Router) {
    this.subscriptions.add(this.softNavigations.subscribe(() => {
      // focus if url does not have fragment
      if (!this.router.url.split('#')[1]) {
        setTimeout(() => {
          if (this.navigationFocusRequests.length) {
            this.navigationFocusRequests[this.navigationFocusRequests.length - 1]
              .nativeElement.focus({preventScroll: true});
          }
        }, 100);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  requestFocusOnNavigation(el: ElementRef, wantsFocus: boolean) {
    wantsFocus ? this.navigationFocusRequests.push(el) :
      this.navigationFocusRequests.splice(this.navigationFocusRequests.indexOf(el), 1);
  }

  requestSkipLinkFocus(el: ElementRef, wantsFocus: boolean) {
    if (wantsFocus) {
      this.navigationFocusRequests.push(el);
      const baseUrl = this.router.url.split('#')[0];
      const skipLinKTargetId = el.nativeElement.id;
      this.skipLinkHref = `${baseUrl}#${skipLinKTargetId}`;
    } else {
      this.skipLinkFocusRequests.splice(this.skipLinkFocusRequests.indexOf(el), 1);
    }
  }

  getSkipLinkHref(): string {
    return this.skipLinkHref;
  }

  isNavigationWithinComponentView(previousUrl: string, newUrl: string) {
    const componentViewExpression = /(components|cdk)\/([^\/]+)/;

    const previousUrlMatch = previousUrl.match(componentViewExpression);
    const newUrlMatch = newUrl.match(componentViewExpression);

    return previousUrl && newUrl && previousUrlMatch && newUrlMatch
      && previousUrlMatch[0] === newUrlMatch[0]
      && previousUrlMatch[1] === newUrlMatch[1];
  }
}
