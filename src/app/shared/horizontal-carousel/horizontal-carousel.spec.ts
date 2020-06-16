import {HorizontalCarousel, HorizontalCarouselModule} from './horizontal-carousel';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {Component, ViewChild} from '@angular/core';
import {CarouselItem} from './horizontal-carousel-directive';

describe('HorizontalCarousel', () => {
  let fixture: ComponentFixture<CarouselTestComponent>;
  let component: HorizontalCarousel;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        imports: [HorizontalCarouselModule, DocsAppTestingModule],
        declarations: [CarouselTestComponent, CarouselItem]
      }
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselTestComponent);

    fixture.detectChanges();
  });

  it('should not show prev nav arrow when instantiated', () => {
    const navPrevious = fixture.nativeElement.querySelector('.docs-carousel-nav-prev');
    expect(navPrevious).toBeNull();

    const navNext = fixture.nativeElement.querySelector('.docs-carousel-nav-next');
    expect(navNext).toBeDefined();
  });

  it('should show prev nav arrow after increasing index', () => {
    component = fixture.componentInstance.carousel;
    component.next();
    expect(component.index).toEqual(1);

    const navPrevious = fixture.nativeElement.querySelector('.docs-carousel-nav-prev');
    expect(navPrevious).toBeDefined();
  });

  it('should trigger onResize method when window is resized', () => {
    component = fixture.componentInstance.carousel;
    const carousel = fixture.nativeElement.querySelector('.docs-carousel');
    const spyOnResize = spyOn(component, 'onResize');
    spyOnProperty(window, 'innerWidth').and.returnValue(1680);

    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();

    expect(carousel.style.width).toEqual('1250px');
    expect(component.visibleCards).toEqual(5);
  });
});

@Component({
  selector: 'test-carousel',
  template:
      `
    <app-horizontal-carousel [itemWidth]="250" [itemHeight]="110">
      <div carousel-item class="docs-carousel-item-container"></div>
      <div carousel-item class="docs-carousel-item-container"></div>
      <div carousel-item class="docs-carousel-item-container"></div>
    </app-horizontal-carousel>`,
})
class CarouselTestComponent {
  @ViewChild(HorizontalCarousel) carousel: HorizontalCarousel;
}

