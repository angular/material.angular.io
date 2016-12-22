import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlunkerWriter} from '../../shared/plunker/plunker-writer';
import {ExampleData} from '../../examples/example-data';


@Component({
  selector: 'plunker-viewer',
  template: 'Loading plunker template...',
  providers: [PlunkerWriter],
})
export class PlunkerViewer {
  constructor(
    private _route: ActivatedRoute,
    public plunkerWriter: PlunkerWriter) {
    _route.params.subscribe(p => {
      let exampleData = new ExampleData(p['id']);
      this.plunkerWriter.openPlunker(exampleData).then((_) => this.plunkerWriter.submit());
    });
  }
}
