import {Component, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'material-docs-app',
  templateUrl: './material-docs-app.html',
  styleUrls: ['./material-docs-app.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MaterialDocsApp {
  showShadow = false;
  baseTitle = 'Angular Material';

  constructor(router: Router, private _titleService: Title) {
    let previousRoute = router.routerState.snapshot.url;

    router.events.subscribe((data: NavigationStart) => {
      this.showShadow = data.url.startsWith('/components');

      // We want to reset the scroll position on navigation except when navigating within
      // the documentation for a single component.
      if (!isNavigationWithinComponentView(previousRoute, data.url)) {
        resetScrollPosition();
      }

      previousRoute = data.url;

      // set page title
      this._setTitle(window.location.pathname);
    });
  }

  private _setTitle(pathname) {
    const title = this._getTitle(pathname);
    title ?
      this._titleService.setTitle(`${this.baseTitle} - ${this._capitalizeTitle(title)}`) :
      this._titleService.setTitle(this.baseTitle);
  }

  private _getTitle(pathname) {
    return pathname.split('/').filter(Boolean).pop();
  }

  private _trimFilename(filename) {
    const isFilenameRegex = new RegExp(/.+\./g);
    return ~filename.search(isFilenameRegex) ?
      filename.match(isFilenameRegex)[0].replace('.', '') :
      filename;
  }

  private _capitalizeTitle(title) {
    return title[0].toUpperCase() + this._trimFilename(title.slice(1));
  }
}

function isNavigationWithinComponentView(oldUrl: string, newUrl: string) {
  const componentViewExpression = /components\/(\w+)/;
  return oldUrl && newUrl
      && componentViewExpression.test(oldUrl)
      && componentViewExpression.test(newUrl)
      && oldUrl.match(componentViewExpression)[1] === newUrl.match(componentViewExpression)[1];
}

function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = document.querySelector('.mat-sidenav-content');
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}
