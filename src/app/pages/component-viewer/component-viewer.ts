import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentationItems, DocItem} from '../../shared/documentation-items/documentation-items';


@Component({
  selector: 'app-component-viewer',
  templateUrl: './component-viewer.html',
  styleUrls: ['./component-viewer.scss', './component-viewer-sidenav.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentViewer {
  componentDocItem: DocItem;

  constructor(private _route: ActivatedRoute, public docItems: DocumentationItems) {
    _route.params.subscribe(p => {
      this.componentDocItem = docItems.getItemById(p['id']);
    });
  }
}
