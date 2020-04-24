import {ElementRef, Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, skip} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationFocusService {
  private navigationFocusRequests: ElementRef[] = [];
  private skipLinkHref = '';

  readonly navigationEndEvents = this.router.events.pipe(filter(event => event instanceof
    NavigationEnd));
  readonly softNavigations = this.navigationEndEvents.pipe(skip(1));

  constructor(private router: Router) {
    this.softNavigations.subscribe(() => {
      // focus if url does not have fragment
      if (!this.router.url.split('#')[1]) {
        setTimeout(() => {
          if (this.navigationFocusRequests.length) {
            this.navigationFocusRequests[this.navigationFocusRequests.length - 1]
              .nativeElement.focus({preventScroll: true});
          }}, 100);
      }
    });
  }

  requestFocusOnNavigation(el: ElementRef, wantsFocus: boolean) {
    wantsFocus ? this.navigationFocusRequests.push(el) :
      this.navigationFocusRequests.splice(this.navigationFocusRequests.indexOf(el), 1);
  }

  requestSkipLinkFocus(el: ElementRef) {
    const baseUrl = this.router.url.split('#')[0];
    const skipLinKTargetId = el.nativeElement.id;
    this.skipLinkHref = `${baseUrl}#${skipLinKTargetId}`;
  }

  getSkipLinkHref(): string {
    return this.skipLinkHref;
  }
}
