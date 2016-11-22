import {ElementRef, Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {IThemeColors, SVGBuilder} from './svg-builder';
import {ThemeStorage, IDocsSiteTheme} from '../theme-chooser/theme-storage/theme-storage';


@Component({
  selector: 'docs-svg-viewer',
  template: '<div [inlineSVG]="svgHref" class="docs-svg-viewer"></div>',
})

export class SVGViewer {
  @Input()
  public svgHref: string;

  private _subscription: Subscription;
  private currTheme: IDocsSiteTheme;
  private _previousThemeColors: IThemeColors = SVGBuilder.DEFAULT_THEME;

  constructor(
    public themeStorage: ThemeStorage,
    public svgBuilder: SVGBuilder,
    public el: ElementRef
  ) {
    this.currTheme = this.themeStorage.getStoredTheme();
    this._subscription = this.themeStorage.onThemeUpdate
      .subscribe(theme => this.swapTheme(theme));
  }

  public ngAfterViewInit() {
    if (this.currTheme) {
      setTimeout(this.swapTheme.bind(this, this.currTheme));
    }
  }

  public swapTheme(theme) {
    const {newTemplate, colors} = this.svgBuilder.buildSVG(
      theme, this.getSVGFileAsString(), this._previousThemeColors);
    this.injectSVG(newTemplate);
    this._previousThemeColors = colors;
  }

  public ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  public injectSVG(template) {
    this.el.nativeElement.innerHTML = template;
  }

  public getSVGFileAsString(): string {
    return this.el
      .nativeElement
      .innerHTML;
  }
}
