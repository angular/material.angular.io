import {Injectable} from '@angular/core';

import {IDocsSiteTheme} from '../theme-chooser/theme-storage/theme-storage';

const Color = require('color');


export interface IThemeColors {
  gradientPrimaryDark: string;
  gradientPrimary: string;
  washedOutPrimary: string;
  offWhitePrimary: string;
  lighterPrimary: string;
  lightPrimary: string;
  deepPrimary: string;
  primary: string;
  darkerPrimary: string;
  accent: string;
};


@Injectable()
export class SVGBuilder {
  static DEFAULT_THEME: IThemeColors = {
    gradientPrimary: '#0CBFD6',
    gradientPrimaryDark: '#05BED5',
    washedOutPrimary: '#E1F7FA',
    offWhitePrimary: '#B9EDF3',
    lighterPrimary: '#CCF2F6',
    lightPrimary: '#00BCD4',
    primary: '#89E0EB',
    deepPrimary: '#00BDD5',
    darkerPrimary: '#5CD8E7',
    accent: '#274C51',
  };

  public buildSVG(theme: IDocsSiteTheme, template: string, previousThemeColors) {
    const colors = theme ? this.createThemeColors(theme) : SVGBuilder.DEFAULT_THEME;
    const newTemplate = this.replaceColorCodes(template, colors, previousThemeColors);
    return {newTemplate, colors};
  }

  public createThemeColors(theme: IDocsSiteTheme): IThemeColors {
    const {primary, accent} = theme;
    return {
      primary, accent,
      gradientPrimaryDark: Color(primary).lighten(0.3).hex(),
      gradientPrimary: Color(primary).lighten(0.4).hex(),
      washedOutPrimary: Color(primary).lighten(0.85).hex(),
      offWhitePrimary: Color(primary).lighten(0.8).hex(),
      lighterPrimary: Color(primary).lighten(0.6).hex(),
      lightPrimary: Color(primary).lighten(0.2).hex(),
      deepPrimary: Color(primary).darken(0.3).hex(),
      darkerPrimary: Color(primary).darken(0.4).hex(),
    };
  }

  public replaceColorCodes(template: string, colors: IThemeColors, previousThemeColors: IThemeColors): string {
    let finalTemplate = template;
    Object.keys(colors).forEach(key => {
      const prevColor = previousThemeColors[key];
      const newColor = colors[key];
      if (prevColor && newColor) {
        finalTemplate = this._replaceColor(finalTemplate, prevColor, newColor);
      }
    });
    return finalTemplate;
  }

  public _replaceColor(template: string, color: string, replacement: string): string {
    return template.replace(new RegExp(color, 'gi'), replacement);
  }
}