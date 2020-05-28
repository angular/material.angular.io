import { browser } from 'protractor';

export class AppPage {
  navigateTo(component: string): Promise<unknown> {
    return browser.get(browser.baseUrl + '/' + component) as Promise<unknown>;
  }
}
