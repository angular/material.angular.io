import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {StyleManager} from '../style-manager/style-manager';

@Component({
  selector: 'theme-chooser',
  templateUrl: 'theme-chooser.html',
  styleUrls: ['theme-chooser.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemeChooser {
  themes = [
    {color: '#673AB7', href: '@angular/material/core/themeing/prebuilt/deeppurple-amber.css'},
    {color: '#3F51B5', href: '@angular/material/core/themeing/prebuilt/indigo-pink.css'},
    {color: '#E91E63', href: '@angular/material/core/themeing/prebuilt/pink-bluegrey.css'},
    {color: '#9C27B0', href: '@angular/material/core/themeing/prebuilt/purple-green.css'},
  ];

  constructor(private _styleManager : StyleManager) {}

  installTheme(href: string) {
    this._styleManager.setStyle('theme', href);
  }
}
