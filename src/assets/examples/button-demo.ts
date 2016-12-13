import {Component} from '@angular/core';


@Component({
  selector: 'button-demo',
  template: '<button md-raised-button color="primary"> A button {{name}}</button>',
})
export class ButtonDemo {
  name: string = 'Unique button'
}
