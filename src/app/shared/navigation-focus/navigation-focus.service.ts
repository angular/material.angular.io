import {ElementRef, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {filter, skip, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationFocusService {
  private internalNavigation: boolean;
  private focusRequestStack: ElementRef[];

  constructor(private router:Router) {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        skip(1),
        take(1)
      )
      .subscribe(() => {
        this.internalNavigation = true;
      });
  }

  isInternalNavigation(): boolean {
    return this.internalNavigation;
  }

  requestFocusOnNavigation(el: ElementRef, wantsFocus: boolean) {
    wantsFocus ? this.focusRequestStack.push(el) :
      this.focusRequestStack.splice(this.focusRequestStack.indexOf(el), 1);
  }
}
