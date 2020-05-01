import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'code-snippet',
  templateUrl: './code-snippet.html',
  styleUrls: ['./example-viewer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSnippet {
  @Input() source: string;
  @Input() lines:[number, number];

}
