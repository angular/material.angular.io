import {Component} from '@angular/core';


@Component({
  selector: 'button-demo',
  templateUrl: 'button-demo.html',
  styleUrls: ['button-demo.css'],
})
export class ButtonDemo {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
