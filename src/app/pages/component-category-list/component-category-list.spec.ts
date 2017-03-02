import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {ComponentCategoryList, ComponentCategoryListModule} from './component-category-list';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {DocumentationItems} from '../../shared/documentation-items/documentation-items';
import {ComponentPageTitle} from '../page-title/page-title';


describe('ComponentCategoryList', () => {
  let fixture: ComponentFixture<ComponentCategoryList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentCategoryListModule, DocsAppTestingModule],
      providers: [ComponentPageTitle],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCategoryList);
  });

  it('should set page title on init', () => {
    const component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component._componentPageTitle.title).toEqual('Component Library');
  });

  it('should render a card for every category', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const categories = component.docItems.getItemsInCategories();
    const cards = fixture
      .nativeElement.querySelectorAll('.docs-component-category-list-card');
    expect(cards.length).toEqual(categories.length);
  });
});
