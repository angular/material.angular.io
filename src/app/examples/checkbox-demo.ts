import {Component} from '@angular/core';


@Component({
  selector: 'checkbox-demo',
  template: '<md-checkbox> A checkbox with {{name}}</md-checkbox>',
})
export class CheckboxDemo {
  name: string = 'Unique checkbox'
}
