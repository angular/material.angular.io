import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Carousel, CarouselItem, CarouselContentManagerComponent} from './carousel';``

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [Carousel, CarouselItem],
  declarations: [Carousel, CarouselItem, CarouselContentManagerComponent],
})
export class CarouselModule {
}
