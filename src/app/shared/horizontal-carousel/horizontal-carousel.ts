import {
  AfterContentChecked, AfterContentInit,
  AfterViewInit, ChangeDetectorRef,
  Component, ContentChildren,
  HostBinding,
  Input,
  NgModule, OnInit, QueryList,
  ViewEncapsulation
} from '@angular/core';
import {GuideItems} from '../guide-items/guide-items';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CarouselItem} from './horizontal-carousel-directive';

const CAROUSEL_WIDTH_RATIO = 0.75; // carousel width should be approximately 75% of page

@Component({
  selector: 'app-horizontal-carousel',
  templateUrl: './horizontal-carousel.html',
  styleUrls: ['./horizontal-carousel.scss'],
  encapsulation: ViewEncapsulation.None,
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

  // constructor(private cdRef: ChangeDetectorRef) {
  // }

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
    this._resizeCarousel(window.innerWidth);
  }

  ngAfterContentInit(): void {
    this.shiftWidth = this.items.first.elem.nativeElement.clientWidth;
    this._resizeCarousel(window.innerWidth);
  }

  private _resizeCarousel(width: number) {
    // debugger;
    const newVisibleCards = Math.floor((width * CAROUSEL_WIDTH_RATIO) / this.shiftWidth);
    if (this.visibleCards !== newVisibleCards) {
      this.visibleCards = newVisibleCards;
      this.showNextArrow = this.index < (this.items.length - this.visibleCards);
    }
    this.visibleCards = newVisibleCards;
    this.width = `${this.visibleCards * this.shiftWidth}px`;
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
}

@NgModule({
  imports: [MatCardModule, CommonModule, RouterModule, MatIconModule, MatButtonModule],
  exports: [HorizontalCarousel],
  declarations: [HorizontalCarousel],
  providers: [GuideItems]
})
export class HorizontalCarouselModule {
}
