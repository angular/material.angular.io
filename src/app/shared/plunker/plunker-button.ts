import { Component, Input } from '@angular/core';


@Component({
  selector: 'plunker-button',
  templateUrl: './plunker-button.html',
})
export class PlunkerButton {
  _example: string;

  get exampleLink() {
    return `/plunker/${this._example}`;
  }

  @Input()
  set example(example: string) {
    this._example = example;
  }
}

