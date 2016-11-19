import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PlunkerWriter } from './plunker-writer';
import { PlunkerData } from './plunker-data';

@Component({
  selector: 'plunker-button',
  templateUrl: 'plunker-button.html',
})
export class PlunkerButton {

  exampleData: PlunkerData = new PlunkerData();

  plunkerUtil: PlunkerWriter;

  constructor(private _http: Http) {
    this.plunkerUtil = new PlunkerWriter(_http);
  }

  openPlunker(): void {
    this.plunkerUtil.openPlunker(this.exampleData);
  }
}
