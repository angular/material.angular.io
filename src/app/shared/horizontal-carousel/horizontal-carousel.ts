import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  QueryList,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CarouselItem} from './horizontal-carousel-directive';

const CAROUSEL_WIDTH_RATIO = 0.75; // carousel width should be approximately 75% of page


export const WINDOW = new InjectionToken('window');

@Component({
  selector: 'app-horizontal-carousel',
  templateUrl: './horizontal-carousel.html',
  styleUrls: ['./horizontal-carousel.scss'],
})
export class HorizontalCarousel implements AfterContentInit {
  @Input() itemWidth: number;
  @Input() itemHeight: number;
  @ContentChildren(CarouselItem) items: QueryList<CarouselItem>;

  position = 0;
  showPrevArrow = false;
  showNextArrow = true;
  visibleCards: number;
  shiftWidth: number;

  @HostBinding('style.width') width: string;

  constructor(@Optional() @Inject(WINDOW) readonly _window: any) {
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
    this.index += 1;
    this.position += this.shiftWidth;
    this.items.forEach((card: CarouselItem) => {
      card.elem.nativeElement.style.transform = `translateX(-${this.position}px)`;
    });
  }

  previous() {
    this.index -= 1;
    this.position -= this.shiftWidth;
    this.items.forEach((card: CarouselItem) => {
      card.elem.nativeElement.style.transform = `translateX(-${this.position}px)`;
    });
  }

  private _resizeCarousel() {
    const documentWindow = this._window || window;
    const newVisibleCards = Math.min(
      Math.floor((documentWindow.innerWidth * CAROUSEL_WIDTH_RATIO) / this.shiftWidth),
      this.items.length);
    if (this.visibleCards !== newVisibleCards) {
      this.visibleCards = newVisibleCards;
      this.showNextArrow = this.index < (this.items.length - this.visibleCards);
    }
    this.visibleCards = newVisibleCards;
    this.width = `${this.visibleCards * this.shiftWidth}px`;
  }
}

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [HorizontalCarousel, CarouselItem],
  declarations: [HorizontalCarousel, CarouselItem],
})
export class HorizontalCarouselModule {
}
