import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {GuideViewer, GuideViewerModule} from './guide-viewer';

const guideItemsId = 'getting-started';

const mockActivatedRoute = {
  fragment: Observable.create(observer => {
    observer.complete();
  }),
  params: Observable.create(observer => {
    observer.next({id: guideItemsId});
    observer.complete();
  })
};


describe('GuideViewer', () => {
  let fixture: ComponentFixture<GuideViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GuideViewerModule, DocsAppTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideViewer);
  });

  it('should set the guide based off route params', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.guide)
      .toEqual(component.guideItems.getItemById(guideItemsId));
  });
});
