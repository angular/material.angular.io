import {Component, NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material-experimental/mdc-input';
import {MatFormFieldModule} from '@angular/material-experimental/mdc-form-field';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'input-scene',
  templateUrl: './input-scene.html',
  styleUrls: ['./input-clearable-example.css'],
})
export class InputScene {
  value = 'Clear me';
}

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  exports: [InputScene],
  declarations: [InputScene],
})
export class InputSceneModule { }
