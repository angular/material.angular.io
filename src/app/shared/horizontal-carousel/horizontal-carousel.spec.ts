import {HorizontalCarousel, HorizontalCarouselModule, WINDOW} from './horizontal-carousel';
import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {Component, ViewChild} from '@angular/core';


describe('HorizontalCarousel', () => {
  let fixture: ComponentFixture<CarouselTestComponent>;
  let component: HorizontalCarousel;
  let fakeWindow: any;


  beforeEach(async(() => {
    fakeWindow = {innerWidth: 1000};
    TestBed.configureTestingModule(
      {
        imports: [HorizontalCarouselModule, DocsAppTestingModule],
        declarations: [CarouselTestComponent],
        providers: [{provide: WINDOW, useValue: fakeWindow}]
      }
    ).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(CarouselTestComponent);
    fixture.detectChanges();
    flush();
  }));

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

  it('should hide next nav arrow after reaching end of items', () => {
    component = fixture.componentInstance.carousel;
    expect(component.visibleCards).toBe(3);

    component.next();
    component.next();
    component.next();
    fixture.detectChanges();

    expect(component.index).toEqual(3);

    const navPrevious = fixture.nativeElement.querySelector('.docs-carousel-nav-next');
    expect(navPrevious).toBeNull();
  });

  it('should resize carousel when not all content can be displayed', () => {
    component = fixture.componentInstance.carousel;
    const carousel = fixture.nativeElement.querySelector('.docs-carousel-wrapper');
    fakeWindow.innerWidth = 1680;
    window.dispatchEvent(new Event('resize'));

    fixture.detectChanges();

    expect(carousel.clientWidth).toEqual(1250);
    expect(component.visibleCards).toEqual(5);
  });

  it('should not resize carousel when all content can be displayed', () => {
    fixture.componentInstance.numberOfItems = 2;
    fixture.detectChanges();

    component = fixture.componentInstance.carousel;
    const carousel = fixture.nativeElement.querySelector('.docs-carousel-wrapper');
    fakeWindow.innerWidth = 1680;
    window.dispatchEvent(new Event('resize'));

    fixture.detectChanges();

    expect(carousel.clientWidth).toEqual(500);
    expect(component.visibleCards).toEqual(2);
  });
});

@Component({
  selector: 'test-carousel',
  template:
      `
    <app-horizontal-carousel itemWidth="250" itemHeight="110">
      <div carousel-item class="docs-carousel-item-container"
           *ngFor="let i of [].constructor(numberOfItems) "></div>
    </app-horizontal-carousel>`,
  styles: ['.docs-carousel-item-container { display: flex; }']
})
class CarouselTestComponent {
  numberOfItems = 6;
  @ViewChild(HorizontalCarousel) carousel: HorizontalCarousel;
}

