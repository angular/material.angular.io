import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  NgModule,
  QueryList,
  ViewChild,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CarouselItemDirective} from './carousel-directive';

const BUTTON_WIDTH = 40;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss'],
})
export class Carousel implements AfterContentInit {
  @Input() itemWidth: number;
  @Input() itemHeight: number;
  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;
  @ViewChild('wrapper') wrapper: ElementRef;

  position = 0;
  showPrevArrow = false;
  showNextArrow = true;
  visibleCards: number;
  shiftWidth: number;

  constructor(private readonly host: ElementRef) {
  }

  private _index = 0;

  get index(): number {
    return this._index;
  }

  set index(i: number) {
    this._index = i;
    this.showPrevArrow = i > 0;
    this.showNextArrow = i < (this.items.length - this.visibleCards);
  }

  onResize() {
    this._resizeCarousel();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.shiftWidth = this.items.first.elem.nativeElement.clientWidth;
      this._resizeCarousel();
    });
  }

  next() {
    this._shiftItems(1);
  }

  previous() {
    this._shiftItems(-1);
  }

  private _shiftItems(shiftIndex: number) {
    this.index += shiftIndex;
    this.position += shiftIndex * this.shiftWidth;
    this.items.forEach((item: CarouselItemDirective) => {
      item.elem.nativeElement.style.transform = `translateX(-${this.position}px)`;
    });
  }

  private _resizeCarousel() {
    const newVisibleCards = Math.max(1, Math.min(
      Math.floor((this.host.nativeElement.offsetWidth - 2 * BUTTON_WIDTH) / this.shiftWidth),
      this.items.length));
    if (this.visibleCards !== newVisibleCards) {
      const shiftIndex = this.index - (this.items.length - this.visibleCards) + 1;
      if (shiftIndex > 0) {
        this._shiftItems(-shiftIndex);
      }
      this.visibleCards = newVisibleCards;
      this.showNextArrow = this.index < (this.items.length - this.visibleCards);
    }
    this.visibleCards = newVisibleCards;
    this.wrapper.nativeElement.style.width = `${this.visibleCards * this.shiftWidth}px`;
  }
}

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [Carousel, CarouselItemDirective],
  declarations: [Carousel, CarouselItemDirective],
})
export class HorizontalCarouselModule {
}
