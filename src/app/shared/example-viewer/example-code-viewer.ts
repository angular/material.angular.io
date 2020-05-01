import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'example-code-viewer',
  templateUrl: './example-code-viewer.html',
  styleUrls: ['./example-viewer.scss'],
})
export class ExampleCodeViewer {
  /** Map of example files that should be displayed in the view-source tab. */
  @Input() exampleTabs: {[tabName: string]: string};

  /** Name of file to display. */
  @Input() fileName: string;

  /** Whether the component is in full or compact view. (Whether to show copy button.) */
  @Input() compactView: boolean;

  /** Range of lines of the source code to display - only valid in compact view. */
  @Input() lines: [number, number];

  /** Whether to show toggle for compact view. */
  @Input() showCompactToggle: boolean;

  @Output() toggleCompactViewEvent = new EventEmitter();

  @Output() copySourceEvent = new EventEmitter();

  toggleCompactView() {
    debugger;
    this.toggleCompactViewEvent.next();
    this.compactView = !this.compactView;
  }

  copySource(content: string) {
    this.copySourceEvent.next(content);
  }
}
