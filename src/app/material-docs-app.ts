import {Component} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'material-docs-app',
  templateUrl: './material-docs-app.html',
  styleUrls: ['./material-docs-app.scss'],
  host: {
    '[class.docs-dark-theme]': 'isDarkTheme',
  }
})
export class MaterialDocsApp {
  isDarkTheme: boolean = false;
}
