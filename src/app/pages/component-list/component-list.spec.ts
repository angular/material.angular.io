import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {InlineSVGModule} from 'ng-inline-svg';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';

import {DocumentationItems} from '../../shared/documentation-items/documentation-items';
import {ComponentPageTitle} from '../page-title/page-title';
import {ComponentList} from './component-list';

const CATEGORY_ID = 'forms';
const mockActivatedRoute = {
  params: Observable.create(observer => {
    observer.next({id: CATEGORY_ID});
    observer.complete();
  })
};

describe('ComponentList', () => {
  let fixture: ComponentFixture<ComponentList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, InlineSVGModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ComponentList],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        ComponentPageTitle,
        DocumentationItems,
      ]
    });

    fixture = TestBed.createComponent(ComponentList);
  }));

  it('should set the category from router params', done => {
    const component = fixture.componentInstance;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const actual = component.category;
      const expected = component.docItems.getCategoryById(CATEGORY_ID);
      expect(actual).toEqual(expected);
      done();
    });
  });
});
