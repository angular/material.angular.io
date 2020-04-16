import {NgModule, OnInit, Directive, ElementRef, HostBinding} from '@angular/core';
import {Event, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

/** The timeout id of the previous focus change. */
let lastTimeoutId = -1;

@Directive({
  selector: '[focusOnNavigation]',
})
export class NavigationFocus implements OnInit {
  @HostBinding('tabindex') role = '-1';

  private previousLocation: URL;
  private currentLocation: URL;

  constructor(private el: ElementRef, private router: Router) {}

  ngOnInit() {
    this.currentLocation = new URL(window.location.href);
    this.router.events.pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.previousLocation = this.currentLocation;
        this.currentLocation = new URL(window.location.href);
        if (this.currentLocation.hash) {
          clearTimeout(lastTimeoutId);
          // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
          lastTimeoutId = window.setTimeout(() => document.getElementById(this.currentLocation.hash)!.focus(), 100);
        } else if (isSoftNav(this.currentLocation, this.previousLocation)) {
          clearTimeout(lastTimeoutId);
          // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
          lastTimeoutId = window.setTimeout(() => this.el.nativeElement.focus({preventScroll: true}), 100)
        }
      })
  }
}

function isSoftNav(previousUrl: URL, currentUrl: URL) {
  return previousUrl.hostname === currentUrl.hostname;
}

@NgModule({
  declarations: [NavigationFocus],
  exports: [NavigationFocus],
})
export class NavigationFocusModule {}
