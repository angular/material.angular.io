import {NgModule, Directive, ElementRef, HostBinding, OnDestroy} from '@angular/core';
import {NavigationFocusService} from './navigation-focus.service';

@Directive({
  selector: '[focusOnNavigation]',
})
export class NavigationFocus implements OnDestroy {
  @HostBinding('tabindex') tabindex = '-1';
  @HostBinding('style.outline') outline = 'none';

  constructor(private el: ElementRef, private navigationFocusService: NavigationFocusService) {
    if (!this.el.nativeElement.id) {
      this.el.nativeElement.id = this.el.nativeElement.className + '-focus-target';
    }
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
