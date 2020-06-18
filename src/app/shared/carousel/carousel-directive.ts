import {Directive, ElementRef, HostBinding} from '@angular/core';
import {Carousel} from './carousel';

@Directive({
  selector: '[carousel-item]',
})
export class CarouselItemDirective {
  @HostBinding('style.width') width = `${this.carousel.itemWidth}px`;
  @HostBinding('style.height') height = `${this.carousel.itemHeight}px`;
  @HostBinding('tabindex') readonly tabindex = '-1';

  constructor(readonly carousel: Carousel, readonly elem: ElementRef) {
  }
}
