import {AfterViewInit, Component, NgModule, ViewEncapsulation} from '@angular/core';
import {GuideItems} from '../guide-items/guide-items';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const CARD_WIDTH = 250;

@Component({
  selector: 'app-horizontal-carousel',
  templateUrl: './horizontal-carousel.html',
  styleUrls: ['./horizontal-carousel.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class HorizontalCarousel implements AfterViewInit {
  position: number = 0;
  showPrevArrow = false;
  showNextArrow = true;
  guideItemsLen: number;
  visibleCards: number;

  constructor(public guideItems: GuideItems) {
    this.guideItemsLen = guideItems.getAllItems().length;
  }

  private _index = 0;

  get index(): number {
    return this._index;
  }

  set index(i: number) {
    this._index = i;
    this.showPrevArrow = i > 0;
    this.showNextArrow = i < (this.guideItemsLen - this.visibleCards);
  }

  onResize(evt: Event) {
    this.resizeCarousel((evt.target as Window).innerWidth);
  }

  ngAfterViewInit(): void {
    this.resizeCarousel(window.innerWidth);
  }

  resizeCarousel(width: number) {
    const newVisibleCards = Math.floor((width * 0.75) / CARD_WIDTH);
    if (this.visibleCards !== newVisibleCards) {
      this.visibleCards = newVisibleCards;
      this.showNextArrow = this.index < (this.guideItemsLen - this.visibleCards);
    }
    this.visibleCards = newVisibleCards;
    const carousel = document.getElementById('docs-guides-carousel');
    if (carousel) {
      carousel.style.width = `${this.visibleCards * CARD_WIDTH}px`;
    }
  }

  next() {
    this.index += 1;
    const cards = document.getElementsByClassName('docs-guides-card');
    this.position += CARD_WIDTH;
    [].forEach.call(cards, (card: HTMLElement) => {
      card.style.transform = `translateX(-${this.position}px)`;
    });
  }

  prev() {
    this.index -= 1;
    const cards = document.getElementsByClassName('docs-guides-card');
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
