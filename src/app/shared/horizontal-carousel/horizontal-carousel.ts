import {AfterViewInit, Component, NgModule, ViewEncapsulation} from '@angular/core';
import {GuideItems} from '../guide-items/guide-items';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const CARD_WIDTH = 250;
const CAROUSEL_WIDTH_RATIO = 0.75; // carousel width should be 75% of page

@Component({
  selector: 'app-horizontal-carousel',
  templateUrl: './horizontal-carousel.html',
  styleUrls: ['./horizontal-carousel.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class HorizontalCarousel implements AfterViewInit {
  position = 0;
  showPrevArrow = false;
  showNextArrow = true;
  guideItemsLength: number;
  visibleCards: number;

  constructor(public guideItems: GuideItems) {
    this.guideItemsLength = guideItems.getAllItems().length;
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
    this.resizeCarousel(window.innerWidth);
  }

  ngAfterViewInit(): void {
    this.resizeCarousel(window.innerWidth);
  }

  resizeCarousel(width: number) {
    const newVisibleCards = Math.floor((width * CAROUSEL_WIDTH_RATIO) / CARD_WIDTH);
    if (this.visibleCards !== newVisibleCards) {
      this.visibleCards = newVisibleCards;
      this.showNextArrow = this.index < (this.guideItemsLength - this.visibleCards);
    }
    this.visibleCards = newVisibleCards;
    const carousel = document.querySelector('.docs-guides-carousel') as HTMLElement;
    carousel.style.width = `${this.visibleCards * CARD_WIDTH}px`;
  }

  next() {
    this.index += 1;
    const cards = document.getElementsByClassName('docs-carousel-card-container');
    this.position += CARD_WIDTH;
    [].forEach.call(cards, (card: HTMLElement) => {
      card.style.transform = `translateX(-${this.position}px)`;
    });
  }

  previous() {
    this.index -= 1;
    const cards = document.getElementsByClassName('docs-carousel-card-container');
    this.position -= CARD_WIDTH;
    [].forEach.call(cards, (card: HTMLElement) => {
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
