import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  NgModule,
  ViewEncapsulation
} from '@angular/core';
import {GuideItems} from '../guide-items/guide-items';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const CAROUSEL_WIDTH_RATIO = 0.75; // carousel width should be approximately 75% of page

@Component({
  selector: 'app-horizontal-carousel',
  templateUrl: './horizontal-carousel.html',
  styleUrls: ['./horizontal-carousel.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class HorizontalCarousel implements AfterViewInit {
  @Input() itemWidth = 190;
  @Input() itemHeight = 190;
  position = 0;
  showPrevArrow = false;
  showNextArrow = true;
  guideItemsLength = this.guideItems.getAllItems().length;
  visibleCards: number;
  items: NodeListOf<HTMLElement>;
  shiftWidth = 0;

  @HostBinding('style.width') width: string;

  constructor(readonly guideItems: GuideItems) {
  }

  private _index = 0;

  get index(): number {
    return this._index;
  }

  set index(i: number) {
    this._index = i;
    this.showPrevArrow = i > 0;
    this.showNextArrow = i < (this.guideItemsLength - this.visibleCards);
  }

  onResize() {
    this._resizeCarousel(window.innerWidth);
  }

  ngAfterViewInit(): void {
    this.items = document.querySelectorAll('.docs-carousel-item-container');
    this.shiftWidth = this.items[0].clientWidth;
    this._resizeCarousel(window.innerWidth);
  }

  private _resizeCarousel(width: number) {
    const newVisibleCards = Math.floor((width * CAROUSEL_WIDTH_RATIO) / this.shiftWidth);
    if (this.visibleCards !== newVisibleCards) {
      this.visibleCards = newVisibleCards;
      this.showNextArrow = this.index < (this.guideItemsLength - this.visibleCards);
    }
    this.visibleCards = newVisibleCards;
    this.width = `${this.visibleCards * this.shiftWidth}px`;
  }

  next() {
    this.index += 1;
    this.position += this.shiftWidth;
    this.items.forEach((card) => {
      card.style.transform = `translateX(-${this.position}px)`;
    });
  }

  previous() {
    this.index -= 1;
    this.position -= this.shiftWidth;
    this.items.forEach((card) => {
      card.style.transform = `translateX(-${this.position}px)`;
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
