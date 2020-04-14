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

  constructor(private el: ElementRef, private router: Router) {}

  ngOnInit() {
    let previousHostName = window.location.hostname;
    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const afterHostName = window.location.hostname
        // only want to focus on the element if the navigation was a soft nav,
        // otherwise first focusable element should be the skip link
        if (isSoftNav(previousHostName, afterHostName)) {
          // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
          clearTimeout(lastTimeoutId);
          lastTimeoutId = window.setTimeout(() => this.el.nativeElement.focus({preventScroll: true}),
            100);
        }
        previousHostName = afterHostName;
      });
  }
}

function isSoftNav(previousHostName: string, afterHostName: string) {
  return previousHostName === afterHostName;
}

@NgModule({
  declarations: [NavigationFocus],
  exports: [NavigationFocus],
})
export class NavigationFocusModule {}
