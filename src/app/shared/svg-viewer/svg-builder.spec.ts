import {IDocsSiteTheme} from '../theme-chooser/theme-storage/theme-storage';
import {SVGBuilder} from './svg-builder';


describe('SVG Builder', () => {
  const service: SVGBuilder = new SVGBuilder();
  const defaultData = SVGBuilder.DEFAULT_THEME;
  const black = '#000000';
  const white = '#ffffff';
  const primary = '#FFA669';
  const accent = '#F0F8FF';
  let testTheme: IDocsSiteTheme;
  let template;

  beforeEach(() => {
    testTheme = {
      primary: '#FFA669',
      accent: '#F0F8FF',
      isDark: false,
      href: 'coolland.py'
    };

    template = '';
    Object.keys(defaultData).forEach(key => {
      if (defaultData[key]) {
        template += `someRandomData fill="${defaultData[key]}"`;
      }
    });
  });

  it('replaceColor should return a string with all instances of a hex code replaced', () => {
    const oneHexCode = `<someTemplate fill="${black}"></someTemplate>`;
    const twoHexCodes = `<someTemplate fill="${black}" stroke-fill="${black}"></someTemplate>`;
    const checkStringMissingIn = (template, search) => !~template.indexOf(search);
    const result1 = service._replaceColor(oneHexCode, black, white);
    const result2 = service._replaceColor(twoHexCodes, black, white);
    [result1, result2].forEach(result => {
      expect(checkStringMissingIn(result, black)).toBeTruthy();
      expect(checkStringMissingIn(result, white)).toBeFalsy();
    });
  });

  it('should build a IThemeColors object based off a primary and secondary hex code', () => {
    const result = service.createThemeColors(testTheme);
    const expectedKeys = Object.keys(defaultData);
    Object.keys(result).forEach(key => {
      expect(result[key]).toBeTruthy();
      expect(expectedKeys.find(ek => ek === key)).toBeTruthy();
    });
  });

  it('replaceColorCodes will replace all instances of a previous theme\'s colors, with new ones', () => {
    const colors = service.createThemeColors(testTheme);
    const newTemplate = service.replaceColorCodes(template, colors, defaultData);
    Object.keys(colors).forEach(key => {
      expect(~newTemplate.indexOf(colors[key])).toBeTruthy();
      if (defaultData[key]) {
        expect(~newTemplate.indexOf(defaultData[key])).toBeFalsy();
      }
    });
  });

  it('should return a new template and theme colors when calling buildSVG', () => {
    const result = service.buildSVG(testTheme, template, defaultData);
    expect(result.colors).toEqual(service.createThemeColors(testTheme));
    expect(result.newTemplate).toEqual(service.replaceColorCodes(
      template, result.colors, defaultData));
  });
});
