import {Injectable} from '@angular/core';


/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable()
export class StyleManager {
  /**
   * Set the stylesheet with the specified key.
   * @param key The key for the slot to load the stylesheet into.
   * @param href The url for the stylesheet.
   */
  setStyle(key: string, href: string) {
    this._getLinkElementForKey(key, true).setAttribute('href', href);
  }

  /**
   * Remove the stylesheet with the specified key.
   * @param key The key for the slot to clear.
   */
  removeStyle(key: string) {
    let el = this._getLinkElementForKey(key);
    document.head.removeChild(el);
  }

  /**
   * Gets the `<link>` element for the specified key.
   * @param key The key for the slot whose element we want.
   * @param create Whether to create the element if it doesn't exist.
   * @returns {HTMLLinkElement} The `<link.` element.
   * @private
   */
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
