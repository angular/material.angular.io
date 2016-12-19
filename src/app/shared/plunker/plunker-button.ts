import { Component } from '@angular/core';
import { PlunkerWriter } from './plunker-writer';
import { ExampleData } from './example-data';

@Component({
  selector: 'plunker-button',
  templateUrl: './plunker-button.html',
  providers: [PlunkerWriter],
})
export class PlunkerButton {

  exampleData: ExampleData = new ExampleData();

  constructor(private plunkerWriter: PlunkerWriter) {}

  openPlunker(): void {
    this.plunkerWriter.openPlunker(this.exampleData);
  }
}
