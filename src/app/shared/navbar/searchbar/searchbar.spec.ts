import {Injectable} from '@angular/core';
import {TestBed, inject, async, ComponentFixture} from '@angular/core/testing';
import {Router, RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {ReactiveFormsModule, FormControl} from '@angular/forms';

import {DocumentationItems, DocItem} from '../../documentation-items/documentation-items';
import {SearchBar} from './searchbar';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  navigateByUrl: jasmine.createSpy('navigateByUrl')
};

const testDocItem = {
  id: 'test-doc-item',
  name: 'TestingExample',
  examples: ['test-examples']
};


class MockDocumentationItems extends DocumentationItems {
  getAllItems(): DocItem[] { return [testDocItem]; }
}


describe('SearchBar', () => {
  let fixture: ComponentFixture<SearchBar>;
  let component: SearchBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, ReactiveFormsModule, MaterialModule],
      declarations: [SearchBar],
      providers: [
        {provide: DocumentationItems, useClass: MockDocumentationItems},
        {provide: Router, useValue: mockRouter},
      ],
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    component.searchControl = new FormControl('');
    fixture.detectChanges();
  }));

  afterEach(() => {
    (<any>component._router.navigateByUrl).calls.reset();
  });

  it('should toggle isExpanded', () => {
    expect(component._isExpanded).toBe(false);
    component.toggleIsExpanded();
    expect(component._isExpanded).toBe(true);
  });

  describe('Filter Search Suggestions', () => {
    it('should return all items matching search query', () => {
      const query = 'testing';
      const result = component.filterSearchSuggestions(query);
      expect(result).toEqual([testDocItem]);
    });

    it('should return empty list if no items match', () => {
      const query = 'does not exist';
      const result = component.filterSearchSuggestions(query);
      expect(result).toEqual([]);
    });
  });

  describe('Navigate', () => {

    it('should take an id and navigate to the given route', () => {
      component._navigate('button-toggle');
      expect(component._router.navigateByUrl).toHaveBeenCalled();
    });

    it('should not navigate if no id is given', () => {
      component._navigate('');
      expect(component._router.navigateByUrl).not.toHaveBeenCalled();
    });
  });

  it('should show a snackbar error', () => {
    spyOn(component._snackBar, 'open');
    component._showError();
    expect(component._snackBar.open).toHaveBeenCalled();
    expect(component._snackBar.open).toHaveBeenCalledWith(
      'No search results found.',
      null, {duration: 3000});
  });

  it('should return the proper display value for form control', () => {
    const result = component.displayFn(testDocItem);
    expect(result).toEqual(testDocItem.name);
  });
});



