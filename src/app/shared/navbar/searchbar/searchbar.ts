import {Component, ViewChild} from '@angular/core';
import {MdAutocompleteTrigger, MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';

import {DocumentationItems, DocItem} from '../../documentation-items/documentation-items';


@Component({
  selector: 'search-bar-component',
  templateUrl: './searchbar.html',
  styleUrls: ['./searchbar.scss'],
  host: {
    '[class.docs-expanded]': '_isExpanded'
  }
})

export class SearchBar {

  @ViewChild(MdAutocompleteTrigger)
  private _autocompleteTrigger: MdAutocompleteTrigger;

  allDocItems: DocItem[];
  filteredSuggestions: Observable<DocItem[]>;
  searchControl: FormControl = new FormControl('');
  subscription: Subscription;

  _isExpanded: boolean = false;

  constructor(
    public _docItems: DocumentationItems,
    public _router: Router,
    public _snackBar: MdSnackBar
  ) {
    this.allDocItems = _docItems.getAllItems();
    this.filteredSuggestions = this.searchControl.valueChanges
      .startWith(null)
      .map(item => item ? this.filterSearchSuggestions(item) : this.allDocItems.slice());
  }

  // This handles the user interacting with the autocomplete panel clicks or keyboard.
  ngAfterViewInit() {
    // We listen to the changes on `filteredSuggestions in order to
    // listen to the latest _autocompleteTrigger.optionSelections
    this.subscription = this.filteredSuggestions
      .flatMap(_ => this._autocompleteTrigger.optionSelections)
      .subscribe(evt => this._navigate(evt.source.value.id));
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  toggleIsExpanded(evt?: any) {
    if (!this._isExpanded && evt === null || evt && evt.tagName === 'MD-OPTION') {
      // input not expanded and blurring || input is expanded and we clicked on an option
      return;
    } else if (this._isExpanded && evt === undefined) {
      // input is expanded and we are not blurring
      this._delayDropdown(false);
    } else {
      // defualt behaviour: not expanded and focusing || expanded and blurring
      this._delayDropdown(this._isExpanded);
      this._isExpanded = !this._isExpanded;
    }
  }

  displayFn(item: DocItem) {
    return item.name;
  }

  filterSearchSuggestions(searchTerm): DocItem[] {
    return this.allDocItems.filter(item => new RegExp(`^${searchTerm}`, 'gi').test(item.name));
  }

  handlePlainSearch(searchTerm) {
    const item = this.allDocItems.find(item => item.name.toLowerCase() === searchTerm);
    return item ?
      this._navigate(item.id) :
      this.navigateToClosestMatch(searchTerm);
  }

  navigateToClosestMatch(term) {
    const item = this.filterSearchSuggestions(term)[0];
    item ?
      this._navigate(item.id) :
      this._showError();
  }

  _navigate(id) {
    this._resetSearch();
    return id ? this._router.navigateByUrl(`/components/component/${id}`) : null;
  }

  _resetSearch() {
    this.searchControl.reset();
    this.searchControl.setValue('');
  }

  _showError() {
    this._snackBar.open('No search results found.', null, {duration: 3000});
  }

  _delayDropdown(isExpanded: boolean) {
    if (isExpanded) {
      this._autocompleteTrigger.closePanel();
    } else {
      this._autocompleteTrigger.closePanel();
      setTimeout(() => this._autocompleteTrigger.openPanel(), 210);
    }
  }
}
