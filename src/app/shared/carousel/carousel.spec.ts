import {Carousel} from './carousel';
import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {Component, ViewChild} from '@angular/core';
import {CarouselModule} from './carousel-module';


describe('HorizontalCarousel', () => {
  let fixture: ComponentFixture<CarouselTestComponent>;
  let component: Carousel;


  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        imports: [CarouselModule, DocsAppTestingModule],
        declarations: [CarouselTestComponent],
      }
    ).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(CarouselTestComponent);
    fixture.nativeElement.style.width = '1300px';
    fixture.detectChanges();
    flush();
    component = fixture.componentInstance.carousel;
  }));

  it('should not show prev nav arrow when instantiated', () => {
    const navPrevious = fixture.nativeElement.querySelector('.docs-carousel-nav-prev');
    expect(navPrevious).toBeNull();

    const navNext = fixture.nativeElement.querySelector('.docs-carousel-nav-next');
    expect(navNext).toBeDefined();
  });

  it('should show prev nav arrow after increasing index', () => {
    component.next();
    fixture.detectChanges();

    expect(component.index).toEqual(1);

    const navPrevious = fixture.nativeElement.querySelector('.docs-carousel-nav-prev');
    expect(navPrevious).toBeDefined();
  });

  it('should hide next nav arrow after reaching end of items', () => {
    expect(component.visibleCards).toBe(4);

    component.next();
    component.next();
    component.next();
    component.next();
    fixture.detectChanges();

    expect(component.index).toEqual(4);

    const navPrevious = fixture.nativeElement.querySelector('.docs-carousel-nav-next');
    expect(navPrevious).toBeNull();
  });

  it('should resize carousel when not all content can be displayed', () => {
    const carouselWrapper = fixture.nativeElement.querySelector('.docs-carousel-content-wrapper');
    fixture.nativeElement.style.width = '1350px';
    window.dispatchEvent(new Event('resize'));

    fixture.detectChanges();

    expect(carouselWrapper.clientWidth).toEqual(1250);
    expect(component.visibleCards).toEqual(5);
  });

  it('should not resize carousel when all content can be displayed', () => {
    fixture.componentInstance.numberOfItems = 2;
    fixture.detectChanges();

    const carouselWrapper = fixture.nativeElement.querySelector('.docs-carousel-content-wrapper');
    fixture.nativeElement.style.width = '1350px';
    window.dispatchEvent(new Event('resize'));

    fixture.detectChanges();

    expect(carouselWrapper.clientWidth).toEqual(500);
    expect(component.visibleCards).toEqual(2);
  });
});

@Component({
  selector: 'test-carousel',
  template:
      `
    <app-carousel itemWidth="250">
      <div carousel-item class="docs-carousel-item-container"
           *ngFor="let i of [].constructor(numberOfItems) "></div>
    </app-carousel>`,
  styles: ['.docs-carousel-item-container { display: flex; }']
})
class CarouselTestComponent {
  numberOfItems = 6;
  @ViewChild(Carousel) carousel: Carousel;
}

