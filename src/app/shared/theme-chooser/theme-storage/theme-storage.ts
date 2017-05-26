import {Injectable, EventEmitter} from '@angular/core';

export interface IDocsSiteTheme {
  href: string;
  accent: string;
  primary: string;
  isDark?: boolean;
};


@Injectable()
export class ThemeStorage {
  static storageKey = 'docs-theme-storage-current';

  public onThemeUpdate: EventEmitter<IDocsSiteTheme> = new EventEmitter<IDocsSiteTheme>();

  public storeTheme(theme: IDocsSiteTheme) {
    window.localStorage[ThemeStorage.storageKey] = JSON.stringify(theme);
    this.onThemeUpdate.emit(theme);
  }

  public getStoredTheme(): IDocsSiteTheme {
    const theme = JSON.parse(window.localStorage[ThemeStorage.storageKey] || null);
    return theme
  }

  public clearStorage() {
    window.localStorage.removeItem(ThemeStorage.storageKey);
  }
}
