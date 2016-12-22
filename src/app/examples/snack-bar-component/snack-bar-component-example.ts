import {Component, ViewEncapsulation} from '@angular/core';
import {MdSnackBar} from '@angular/material';


@Component({
  selector: 'snack-bar-component-example',
  templateUrl: './snack-bar-component-example.html',
})
export class SnackBarComponentExample {
  constructor(public snackBar: MdSnackBar) {}

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent);
  }
}


@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: './snack-bar-component-example-snack.html',
  styleUrls: ['./snack-bar-component-example-snack.css'],
})
export class PizzaPartyComponent {}
