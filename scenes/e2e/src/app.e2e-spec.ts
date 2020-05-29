import {AppPage} from './app.po';
import {screenshot} from '../screenshot';

describe('screenshot scenes for each component', () => {
  let page: AppPage;
  const components = ['button', 'checkbox', 'datepicker', 'input'];

  beforeEach(() => {
    page = new AppPage();
  });

  for (const comp of components) {
    it('screenshot for ' + comp + ' scene', () => {
      page.navigateTo(comp);
      screenshot(comp);
    });
  }
});
