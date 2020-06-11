import {Directive} from '@angular/core';
import {HorizontalCarousel} from './horizontal-carousel';

@Directive({
  selector: '[carousel-item]',
  host: {
    '[style.width]': 'carousel.itemWidth + "px"',
    '[style.height]': 'carousel.itemHeight + "px"'
  }
})
export class CarouselItem {
  constructor(public carousel: HorizontalCarousel) {}
}
