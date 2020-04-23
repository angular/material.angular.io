import {ElementRef, Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, skip, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationFocusService {
  private navigationFocusRequests: ElementRef[] = [];

  constructor(private router:Router) {
    this.router.events
      .pipe(filter(event  => event instanceof NavigationEnd),
        skip(1),
      )
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
}
