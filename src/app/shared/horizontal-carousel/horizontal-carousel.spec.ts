import {HorizontalCarousel, HorizontalCarouselModule} from './horizontal-carousel';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DocsAppTestingModule} from '../../testing/testing-module';

describe('HorizontalCarousel', () => {
  let fixture: ComponentFixture<HorizontalCarousel>;
  let component: HorizontalCarousel;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {imports: [HorizontalCarouselModule, DocsAppTestingModule]}
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not show prev nav arrow', () => {
    const navPrevious = fixture.nativeElement.querySelector('.docs-carousel-nav-prev');
    expect(navPrevious).toBeNull();
  });

  it('should show prev nav arrow after increasing index', () => {
    component.next();
    expect(component.index).toEqual(1);

    const navPrevious = fixture.nativeElement.querySelector('.docs-carousel-nav-prev');
    expect(navPrevious).toBeDefined();
  });

  it('should trigger onResize method when window is resized', () => {
    const spyOnResize = spyOn(component, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();
  });

  it('should resize carousel', () => {
    component.resizeCarousel(1680);
    expect(component.visibleCards).toEqual(5);

    const carousel = fixture.nativeElement.querySelector('#docs-guides-carousel');
    expect(carousel?.style.width).toEqual('1250px');

  });

});
