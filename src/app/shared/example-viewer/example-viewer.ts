import {Component, Input} from '@angular/core';
import {Portal, ComponentPortal} from '@angular/material';
import {EXAMPLE_COMPONENTS} from '../../examples/example-module';


@Component({
  selector: 'example-viewer',
  templateUrl: './example-viewer.html',
  styleUrls: ['./example-viewer.scss']
})
export class ExampleViewer {
  selectedPortal: Portal<any>;

  _example: string;

  get example() {
    return this._example;
  }

  @Input()
  set example(example: string) {
    if (example && EXAMPLE_COMPONENTS[example]) {
      this._example = example;
      this.selectedPortal = new ComponentPortal(EXAMPLE_COMPONENTS[example]);
    }
  }
}
