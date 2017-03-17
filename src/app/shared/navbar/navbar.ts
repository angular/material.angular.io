import {Component, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MdIconModule,
  MdButtonModule,
  MdOptionModule,
  MdAutocompleteModule
} from '@angular/material';
import {RouterModule} from '@angular/router';

import {ThemePickerModule} from '../theme-picker/theme-picker';
import {SearchBar} from './searchbar/searchbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBar {}

@NgModule({
  imports: [
    CommonModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdOptionModule,
    RouterModule,
    ReactiveFormsModule,
    MdIconModule,
    ThemePickerModule
  ],
  exports: [NavBar, SearchBar],
  declarations: [NavBar, SearchBar],
})
export class NavBarModule {}
