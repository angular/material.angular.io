import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'header-link',
  template: `
    <a
      title="Link to this heading"
      class="header-link docs-markdown-a"
      aria-hidden="true"
      [href]="url">
      <i class="material-icons">link</i>
    </a>
  `
})
export class HeaderLink {

  @Input() example: string;

  get url(): string {
    return `${this._rootUrl}#${this.example}`;
  }

  private _rootUrl: string;

  constructor(router: Router) {
    this._rootUrl = router.url.split('#')[0];
  }

}
