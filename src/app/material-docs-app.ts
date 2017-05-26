import {Component, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

// import {ThemeStorage} from './shared/theme-chooser/theme-storage/theme-storage';


@Component({
  selector: 'material-docs-app',
  templateUrl: './material-docs-app.html',
  styleUrls: ['./material-docs-app.scss'],
  host: {
    '[class.docs-dark-theme]': 'isDarkTheme',
  },
  encapsulation: ViewEncapsulation.None,
})
export class MaterialDocsApp {
  isDarkTheme = false;
  showShadow = false;

  constructor(
    router: Router,
  ) {
    router.events.subscribe((data: NavigationStart) => {
      this.showShadow = data.url.startsWith('/components');
    });

    // _themeStorage
    //   .onThemeUpdate
    //   .subscribe((theme) => this._setIsDarkTheme(theme));
  }

  // public _setIsDarkTheme(theme) {
  //   this.isDarkTheme = theme ? theme.isDark : this.isDarkTheme;
  // }
}
