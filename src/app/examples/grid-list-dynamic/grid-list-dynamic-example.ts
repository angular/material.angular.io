import {Component} from '@angular/core';


@Component({
  selector: 'grid-list-dynamic-example',
  templateUrl: './grid-list-dynamic-example.html',
})
export class GridListDynamicExample {
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}
