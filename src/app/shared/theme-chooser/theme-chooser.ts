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
    {
      primary: '#673AB7',
      accent: '#FFC107',
      href: '@angular/material/core/themeing/prebuilt/deeppurple-amber.css'
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      href: '@angular/material/core/themeing/prebuilt/indigo-pink.css'
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      href: '@angular/material/core/themeing/prebuilt/pink-bluegrey.css'
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      href: '@angular/material/core/themeing/prebuilt/purple-green.css'
    },
  ];

  constructor(private _styleManager : StyleManager) {}

  getSwatchAccentBorderColor(accent: string) {
    return `transparent ${accent} ${accent} transparent`;
  }

  installTheme(href: string) {
    this._styleManager.setStyle('theme', href);
  }
}
