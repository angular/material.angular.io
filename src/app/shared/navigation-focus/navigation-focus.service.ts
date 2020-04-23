import {ElementRef, Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, skip, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationFocusService {
  private navigationFocusRequests: ElementRef[] = [];
  private skipLinkFocusRequests: ElementRef[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
        take(1))
      .subscribe(() => {
        setTimeout(() =>
          this.skipLinkFocusRequests[this.skipLinkFocusRequests.length - 1].nativeElement.id =
            'main-content', 100);
      });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
        skip(1))
      .subscribe(() => {
        if (!window.location.hash) {
          setTimeout(() =>
            this.navigationFocusRequests[this.navigationFocusRequests.length - 1]
              .nativeElement.focus({preventScroll: true}), 100);
        }
      });
  }

  requestFocusOnNavigation(el: ElementRef, wantsFocus: boolean) {
    wantsFocus ? this.navigationFocusRequests.push(el) :
      this.navigationFocusRequests.splice(this.navigationFocusRequests.indexOf(el), 1);
  }

  requestSkipLinkFocus(el: ElementRef, wantsFocus: boolean) {
    wantsFocus ? this.skipLinkFocusRequests.push(el) :
      this.skipLinkFocusRequests.splice(this.skipLinkFocusRequests.indexOf(el), 1);
  }
}
