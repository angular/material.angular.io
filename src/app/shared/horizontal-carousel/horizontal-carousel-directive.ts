import {Directive, ElementRef, HostBinding} from '@angular/core';
import {HorizontalCarousel} from './horizontal-carousel';

@Directive({
  selector: '[carousel-item]',
})
export class CarouselItem {
  @HostBinding('style.width') width = `${this.carousel.itemWidth}px`;
  @HostBinding('style.height') height = `${this.carousel.itemHeight}px`;

  constructor(public carousel: HorizontalCarousel, public elem: ElementRef) {
  }
}
