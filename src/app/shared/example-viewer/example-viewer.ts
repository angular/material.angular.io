import {Component, Input} from '@angular/core';
import {Portal, ComponentPortal} from '@angular/material';
import {EXAMPLE_COMPONENTS} from '../../examples/example-module';


@Component({
  selector: 'example-viewer',
  template: `{{example}}<template [portalHost]="selectedPortal"></template>`,
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
