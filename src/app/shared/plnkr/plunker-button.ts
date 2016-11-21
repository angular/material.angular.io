import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PlunkerWriter } from './plunker-writer';
import { PlunkerData } from './plunker-data';

@Component({
  selector: 'plunker-button',
  templateUrl: 'plunker-button.html',
  providers: [PlunkerWriter],
})
export class PlunkerButton {

  exampleData: PlunkerData = new PlunkerData();

  constructor(private plunkerWriter: PlunkerWriter) {}

  openPlunker(): void {
    this.plunkerWriter.openPlunker(this.exampleData);
  }
}
