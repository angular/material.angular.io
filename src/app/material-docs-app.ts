import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'material-docs-app',
  templateUrl: './material-docs-app.html',
  styleUrls: ['./material-docs-app.scss'],
  host: {
    '[class.docs-dark-theme]': 'isDarkTheme',
  },
  encapsulation: ViewEncapsulation.None,
})
export class MaterialDocsApp {
  isDarkTheme: boolean = false;
}
