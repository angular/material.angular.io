import {AppPage} from './app.po';
import {screenshot} from '../screenshot';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
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

  it('screenshot for datepicker scene', () => {
    page.navigateTo('datepicker');
    screenshot('datepicker');
  });

});
