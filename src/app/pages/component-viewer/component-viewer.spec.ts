import {NgModule} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule, MatIconModule} from '@angular/material';

import {EXAMPLE_COMPONENTS} from '@angular/material-examples';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {ComponentViewer, ComponentViewerModule} from './component-viewer';

const docItemsId = 'button';
const exampleKey = 'button-types';

const mockActivatedRoute = {
  snapshot: {},
  fragment: Observable.create(observer => {
    observer.complete();
  }),
  params: Observable.create(observer => {
    observer.next({id: docItemsId});
    observer.complete();
  }),
  parent: {
    params: Observable.create(observer => {
      observer.next({section: 'components'});
      observer.complete();
    })
  }
};

describe('ComponentViewer', () => {
  let fixture: ComponentFixture<ComponentViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentViewerModule, DocsAppTestingModule, TestExampleModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentViewer);
  });

  it('should set page title correctly', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const expected = `${component.docItems.getItemById(docItemsId, 'material').name}`;
    expect(component._componentPageTitle.title).toEqual(expected);
  });
});


// Create a version of ExampleModule for testing with only one component so that we don't have
// to compile all of the examples for these tests.
@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    NoopAnimationsModule,
    RouterTestingModule.withRoutes([]),
  ],
  declarations: [EXAMPLE_COMPONENTS[exampleKey].component],
  entryComponents: [EXAMPLE_COMPONENTS[exampleKey].component],
})
class TestExampleModule { }
