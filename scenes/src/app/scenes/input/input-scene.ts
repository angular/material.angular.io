import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule} from '@angular/common';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'input-scene',
  templateUrl: './input-scene.html',
  styleUrls: ['./input-scene.scss']
})
export class InputScene {
  value = 'Clear me';
}

@NgModule({
  imports: [
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  exports: [InputScene],
  declarations: [InputScene]
})
export class InputSceneModule {}

