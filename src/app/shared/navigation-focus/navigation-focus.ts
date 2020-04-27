import {NgModule, Directive, ElementRef, HostBinding, OnDestroy} from '@angular/core';
import {NavigationFocusService} from './navigation-focus.service';

@Directive({
  selector: '[focusOnNavigation]',
})
export class NavigationFocus implements OnDestroy {
  @HostBinding('tabindex') readonly tabindex = '-1';
  @HostBinding('style.outline') readonly outline = 'none';

  constructor(private el: ElementRef, private navigationFocusService: NavigationFocusService) {
    if (!this.el.nativeElement.id) {
      this.el.nativeElement.id = 'skip-link-target-${uid++}';
    }
    this.navigationFocusService.requestFocusOnNavigation(el);
    this.navigationFocusService.requestSkipLinkFocus(el);
  }

  ngOnDestroy() {
    this.navigationFocusService.relinquishFocusOnDestroy(this.el);
    this.navigationFocusService.relinquishSkipLinkFocusOnDestroy(this.el);
  }
}
let uid = 0;
@NgModule({
  declarations: [NavigationFocus],
  exports: [NavigationFocus],
})
export class NavigationFocusModule {}
