import {AppPage} from './app.po';
import {browser} from 'protractor';
import {screenshot} from '../screenshot';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.driver.manage().window().setSize(300, 480);
  });

  it('screenshot for input scene', () => {
    page.navigateTo('input');
    screenshot('input');
  });

  it('screenshot for button scene', () => {
    page.navigateTo('button');
    screenshot('button');
  });

  it('screenshot for checkbox scene', () => {
    page.navigateTo('checkbox');
    screenshot('checkbox');
  });

});
