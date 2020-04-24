import {NgModule, Directive, ElementRef, HostBinding, OnDestroy} from '@angular/core';
import {NavigationFocusService} from './navigation-focus.service';

@Directive({
  selector: '[focusOnNavigation]',
})
export class NavigationFocus implements OnDestroy {
  @HostBinding('tabindex') role = '-1';
  @HostBinding('style.outline') outline = 'none';

  constructor(private el: ElementRef, private navigationFocusService: NavigationFocusService) {
    this.navigationFocusService.requestFocusOnNavigation(el, true);
    this.navigationFocusService.requestSkipLinkFocus(el);
  }

  ngOnDestroy() {
    this.navigationFocusService.requestFocusOnNavigation(this.el, false);
  }
}

@NgModule({
  declarations: [NavigationFocus],
  exports: [NavigationFocus],
})
export class NavigationFocusModule {}
