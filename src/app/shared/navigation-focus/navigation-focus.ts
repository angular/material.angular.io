import {NgModule, Directive, ElementRef, HostBinding, OnDestroy} from '@angular/core';
import {NavigationFocusService} from './navigation-focus.service';

@Directive({
  selector: '[focusOnNavigation]',
})
export class NavigationFocus implements OnDestroy {
  @HostBinding('tabindex') role = '-1';
  
  constructor(private el: ElementRef, private navigationFocusService: NavigationFocusService) {
    this.navigationFocusService.requestFocusOnNavigation(el, true);
    this.navigationFocusService.requestSkipLinkFocus(el, true);
  }

  ngOnDestroy() {
    this.navigationFocusService.requestFocusOnNavigation(this.el, false);
    this.navigationFocusService.requestSkipLinkFocus(this.el, false);
  }
}

@NgModule({
  declarations: [NavigationFocus],
  exports: [NavigationFocus],
})
export class NavigationFocusModule {}
