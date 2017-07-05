import {Renderer, Directive, ElementRef} from '@angular/core';


@Directive({
  selector: '[focusElement]'
})

export class FocusElementDirective {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer
  ) { }

  ngAfterViewInit() {
    // Add tabindex 0 so element is focusable by keyboard
    this
      ._renderer
      .setElementAttribute(this._element.nativeElement, 'tabindex', '0');

    // Focus host element after view loads
    // so screen readers will be alerted
    // the page has changed.
    this._element.nativeElement.focus();
  }
}
