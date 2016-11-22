import {Injectable} from '@angular/core';


@Injectable()
export class StyleManager {
  setStyle(key: string, href: string) {
    this._getLinkElementForKey(key, true).setAttribute('href', href);
  }

  removeStyle(key: string) {
    let el = this._getLinkElementForKey(key);
    document.head.removeChild(el);
  }

  private _getLinkElementForKey(key: string, create: boolean = false): HTMLLinkElement {
    let className = `style-manager-${key}`;
    let linkEl = document.head.querySelector(`link[rel="stylesheet"].${className}`);
    if (!linkEl && create) {
      linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'stylesheet');
      linkEl.classList.add(className);
      document.head.appendChild(linkEl);
    }
    return linkEl as HTMLLinkElement;
  }
}
